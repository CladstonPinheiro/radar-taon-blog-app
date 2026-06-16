/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import PostDetailPage from "./components/PostDetailPage";
import LoginPage from "./components/LoginPage";
import EditorPage from "./components/EditorPage";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchPublishedPosts } from "./lib/postsService";
import { Category, BlogPost, slugToCategory, categoryToSlug } from "./types";

interface NavState {
  page: "home" | "category" | "post" | "login" | "editor" | "admin";
  category: Category | null;
  postId: string | null;
}

export default function App() {
  const [navState, setNavState] = useState<NavState>({
    page: "home",
    category: null,
    postId: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setPostsLoading(true);
      const data = await fetchPublishedPosts();
      setPosts(data);
      setPostsLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || "#/";

      if (hash === "#/" || hash === "") {
        setNavState({ page: "home", category: null, postId: null });
        return;
      }

      if (hash === "#/login") {
        setNavState({ page: "login", category: null, postId: null });
        return;
      }

      if (hash === "#/editor") {
        setNavState({ page: "editor", category: null, postId: null });
        return;
      }

      if (hash === "#/admin") {
        setNavState({ page: "admin", category: null, postId: null });
        return;
      }

      const categoryMatch = hash.match(/^#\/categoria\/([^/]+)$/);
      if (categoryMatch) {
        const categorySlug = categoryMatch[1];
        const matchedCategory = slugToCategory(categorySlug);
        if (matchedCategory) {
          setNavState({ page: "category", category: matchedCategory, postId: null });
          return;
        }
      }

      const postMatch = hash.match(/^#\/post\/([^/]+)$/);
      if (postMatch) {
        const postId = postMatch[1];
        setNavState({ page: "post", category: null, postId: postId });
        return;
      }

      setNavState({ page: "home", category: null, postId: null });
    };

    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => {
      window.removeEventListener("hashchange", parseHash);
    };
  }, []);

  const handleNavigateHome = () => {
    setSearchQuery("");
    window.location.hash = "#/";
  };

  const handleNavigateCategory = (cat: Category) => {
    setSearchQuery("");
    window.location.hash = `#/categoria/${categoryToSlug(cat)}`;
  };

  const handleNavigatePost = (postId: string) => {
    window.location.hash = `#/post/${postId}`;
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (navState.page !== "home" && query.trim().length > 0) {
      window.location.hash = "#/";
    }
  };

  const activeCategoryForHeader = useMemo(() => {
    if (navState.page === "category") {
      return navState.category;
    }
    if (navState.page === "post" && navState.postId) {
      const activePost = posts.find((p) => p.id === navState.postId);
      return activePost ? activePost.category : null;
    }
    return null;
  }, [navState, posts]);

  const isFullPage =
    navState.page === "login" ||
    navState.page === "editor" ||
    navState.page === "admin";

  return (
    <div className="bg-[#F9FAFB] text-[#0e1c2e] min-h-screen flex flex-col antialiased">
      <Header
        currentCategory={activeCategoryForHeader}
        currentPage={navState.page}
        searchQuery={searchQuery}
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onSearch={handleSearchChange}
      />

      <main
        className={`flex-grow w-full ${
          isFullPage
            ? ""
            : "max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8"
        }`}
      >
        <div
          className={`flex-grow flex flex-col gap-8 ${
            isFullPage ? "" : "lg:max-w-[calc(100%-344px)]"
          }`}
        >
          {navState.page === "home" && (
            postsLoading ? (
              <div className="flex items-center justify-center py-24 text-[#434655]">
                Carregando posts...
              </div>
            ) : (
              <HomePage
                posts={posts}
                searchQuery={searchQuery}
                onNavigateCategory={handleNavigateCategory}
                onNavigatePost={handleNavigatePost}
              />
            )
          )}

          {navState.page === "category" && navState.category && (
            <CategoryPage
              category={navState.category}
              posts={posts}
              onNavigateHome={handleNavigateHome}
              onNavigatePost={handleNavigatePost}
            />
          )}

          {navState.page === "post" && navState.postId && (
            <PostDetailPage
              postId={navState.postId}
              posts={posts}
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={handleNavigateCategory}
              onNavigatePost={handleNavigatePost}
            />
          )}

          {navState.page === "login" && (
            <LoginPage
              onLoginSuccess={() => {
                window.location.hash = "#/editor";
              }}
            />
          )}

          {navState.page === "editor" && (
            <ProtectedRoute requiredRole="editor">
              <EditorPage onNavigateHome={handleNavigateHome} />
            </ProtectedRoute>
          )}

          {navState.page === "admin" && (
            <ProtectedRoute requiredRole="admin">
              <AdminPage onNavigateHome={handleNavigateHome} />
            </ProtectedRoute>
          )}
        </div>

        {!isFullPage && (
          <Sidebar
            searchQuery={searchQuery}
            onSearch={handleSearchChange}
            onNavigateCategory={handleNavigateCategory}
            onNavigatePost={handleNavigatePost}
            hideNewsletter={false}
          />
        )}
      </main>

      <Footer onNavigateHome={handleNavigateHome} onNavigateCategory={handleNavigateCategory} />
    </div>
  );
}
