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
import { Category, MOCK_POSTS, slugToCategory, categoryToSlug } from "./types";

interface NavState {
  page: "home" | "category" | "post";
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

  // Hash-based router synchronization
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || "#/";
      
      if (hash === "#/" || hash === "") {
        setNavState({ page: "home", category: null, postId: null });
        return;
      }

      // Pattern: #/categoria/:nome
      const categoryMatch = hash.match(/^#\/categoria\/([^/]+)$/);
      if (categoryMatch) {
         const categorySlug = categoryMatch[1];
         const matchedCategory = slugToCategory(categorySlug);
         if (matchedCategory) {
            setNavState({ page: "category", category: matchedCategory, postId: null });
            return;
         }
      }

      // Pattern: #/post/:id
      const postMatch = hash.match(/^#\/post\/([^/]+)$/);
      if (postMatch) {
         const postId = postMatch[1];
         setNavState({ page: "post", category: null, postId: postId });
         return;
      }

      // Default fallback
      setNavState({ page: "home", category: null, postId: null });
    };

    // Initial parse on load
    parseHash();

    // Listen to hash shifts
    window.addEventListener("hashchange", parseHash);
    return () => {
      window.removeEventListener("hashchange", parseHash);
    };
  }, []);

  // Set URL Hash manually for safe history tracking
  const handleNavigateHome = () => {
    setSearchQuery(""); // Clear search on explicit Home navigation
    window.location.hash = "#/";
  };

  const handleNavigateCategory = (cat: Category) => {
    // Clear search query so that user can browse selected category properly
    setSearchQuery("");
    window.location.hash = `#/categoria/${categoryToSlug(cat)}`;
  };

  const handleNavigatePost = (postId: string) => {
    window.location.hash = `#/post/${postId}`;
  };

  // Safe search interception: if user searches, scroll to top and ensure they see answers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (navState.page !== "home" && query.trim().length > 0) {
      window.location.hash = "#/";
    }
  };

  // Determine current active category for Header's visual styling
  const activeCategoryForHeader = useMemo(() => {
    if (navState.page === "category") {
      return navState.category;
    }
    if (navState.page === "post" && navState.postId) {
      const activePost = MOCK_POSTS.find((p) => p.id === navState.postId);
      return activePost ? activePost.category : null;
    }
    return null;
  }, [navState]);

  return (
    <div className="bg-[#F9FAFB] text-[#0e1c2e] min-h-screen flex flex-col antialiased">
      {/* 1. Header component */}
      <Header
        currentCategory={activeCategoryForHeader}
        currentPage={navState.page}
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
      />

      {/* 2. Main content container grids */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Primary Page Views) */}
        <div className="flex-grow flex flex-col gap-8 lg:max-w-[calc(100%-344px)]">
          {navState.page === "home" && (
            <HomePage
              posts={MOCK_POSTS}
              searchQuery={searchQuery}
              onNavigateCategory={handleNavigateCategory}
              onNavigatePost={handleNavigatePost}
            />
          )}

          {navState.page === "category" && navState.category && (
            <CategoryPage
              category={navState.category}
              posts={MOCK_POSTS}
              onNavigateHome={handleNavigateHome}
              onNavigatePost={handleNavigatePost}
            />
          )}

          {navState.page === "post" && navState.postId && (
            <PostDetailPage
              postId={navState.postId}
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={handleNavigateCategory}
              onNavigatePost={handleNavigatePost}
            />
          )}
        </div>

        {/* Right Column (Standard Sidebar Widgets) */}
        <Sidebar
          searchQuery={searchQuery}
          onSearch={handleSearchChange}
          onNavigateCategory={handleNavigateCategory}
          onNavigatePost={handleNavigatePost}
          // Hide redundant sidebar newsletter widget on actual detailed posts if want, or keep always
          hideNewsletter={false}
        />
      </main>

      {/* 3. Footer component */}
      <Footer onNavigateHome={handleNavigateHome} />
    </div>
  );
}
