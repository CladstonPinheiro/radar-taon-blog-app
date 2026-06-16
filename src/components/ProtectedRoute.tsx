/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "editor" | "any";
  children: React.ReactNode;
}

export default function ProtectedRoute({ requiredRole = "any", children }: ProtectedRouteProps) {
  const [status, setStatus] = useState<"checking" | "authorized" | "unauthorized">("checking");

  useEffect(() => {
    let active = true;

    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        if (active) setStatus("unauthorized");
        return;
      }

      const { data: profile } = await supabase
        .from("blog_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        if (active) setStatus("unauthorized");
        return;
      }

      if (requiredRole === "any" || profile.role === requiredRole || profile.role === "admin") {
        if (active) setStatus("authorized");
      } else {
        if (active) setStatus("unauthorized");
      }
    };

    checkAccess();

    return () => {
      active = false;
    };
  }, [requiredRole]);

  useEffect(() => {
    if (status === "unauthorized") {
      window.location.hash = "#/login";
    }
  }, [status]);

  if (status === "checking") {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-24 text-[#434655] gap-3">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-sm">Verificando acesso...</p>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-24 text-[#434655] gap-3">
        <p className="text-sm">Redirecionando para login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
