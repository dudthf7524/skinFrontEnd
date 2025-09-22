    // <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
    //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //                 <div className="flex justify-between items-center h-16">
    //                     <div
    //                         className="flex items-center space-x-2 cursor-pointer"
    //                     >
    //                         <div className="w-10 h-10 bg-[var(--talktail-orange)] rounded-full flex items-center justify-center">
    //                             <Heart className="w-6 h-6 text-white" />
    //                         </div>
    //                         <div>
    //                             <h1 className="text-xl font-bold text-gray-900">Talktail</h1>
    //                             <p className="text-xs text-gray-500">SkinCare AI</p>
    //                         </div>
    //                     </div>
    //                     <div className="hidden md:flex items-center space-x-8">
    //                         <button
    //                             className={`transition-colors ${currentPage === "home"
    //                                 ? "text-[var(--talktail-orange)]"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)]"
    //                                 }`}
    //                         >
    //                             홈
    //                         </button>
    //                         <button
    //                             onClick={() => handleSkinAiPage()}
    //                             className={`transition-colors ${currentPage === "skinai"
    //                                 ? "text-[var(--talktail-orange)]"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)]"
    //                                 }`}
    //                         >
    //                             AI 분석
    //                         </button>
    //                         <button
    //                             onClick={() => handleInfoPage()}
    //                             className={`transition-colors ${currentPage === "info"
    //                                 ? "text-[var(--talktail-orange)]"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)]"
    //                                 }`}
    //                         >
    //                             질병 정보
    //                         </button>
    //                         <button
    //                             onClick={() => handleSearchPage()}
    //                             className={`transition-colors ${currentPage === "search"
    //                                 ? "text-[var(--talktail-orange)]"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)]"
    //                                 }`}
    //                         >
    //                             병원 찾기
    //                         </button>
    //                     </div>

    //                     {/* Right side buttons */}
    //                     <div className="flex items-center space-x-4">
    //                         {localStorage.getItem("user") ? (
    //                             <ProfileBar />
    //                         ) : (
    //                             <>
    //                                 {/* <button
    //                                     onClick={() => handleLoginPage()}
    //                                     className={`transition-colors ${currentPage === "login"
    //                                         ? "text-[var(--talktail-orange)]"
    //                                         : "text-gray-700 hover:text-[var(--talktail-orange)]"
    //                                         }`}
    //                                 >
    //                                     로그인
    //                                 </button> */}
    //                                 <Button
    //                                     onClick={() => handleLoginPage()}
    //                                     size="sm"
    //                                     className="hidden sm:flex bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
    //                                 >
    //                                     로그인
    //                                 </Button>
    //                                 {/* <Button
    //                                     size="sm"
    //                                     className="hidden sm:flex bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
    //                                 >
    //                                     지금 진단하기
    //                                 </Button> */}
    //                             </>
    //                         )}

    //                         {/* Mobile menu button */}
    //                         <Button
    //                             variant="ghost"
    //                             size="sm"
    //                             className="md:hidden p-2"
    //                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    //                         >
    //                             {isMobileMenuOpen ? (
    //                                 <X className="h-6 w-6" />
    //                             ) : (
    //                                 <Menu className="h-6 w-6" />
    //                             )}
    //                         </Button>
    //                     </div>
    //                 </div>
    //             </div>
    //             {loginModal && <LoginPage setLoginModal={setLoginModal} />}
    //             {/* Mobile Navigation Menu */}
    //             {isMobileMenuOpen && (
    //                 <div className="md:hidden border-t border-gray-100 bg-white">
    //                     <div className="px-4 py-2 space-y-1">
    //                         <button
    //                             className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "home"
    //                                 ? "text-[var(--talktail-orange)] bg-orange-50"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
    //                                 }`}
    //                         >
    //                             홈
    //                         </button>
    //                         <button
    //                             onClick={() => handleSkinAiPage()}
    //                             className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "skinai"
    //                                 ? "text-[var(--talktail-orange)] bg-orange-50"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
    //                                 }`}
    //                         >
    //                             AI 분석
    //                         </button>
    //                         <button
    //                             className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "info"
    //                                 ? "text-[var(--talktail-orange)] bg-orange-50"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
    //                                 }`}
    //                         >
    //                             질병 정보
    //                         </button>
    //                         <button
    //                             className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "search"
    //                                 ? "text-[var(--talktail-orange)] bg-orange-50"
    //                                 : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
    //                                 }`}
    //                         >
    //                             병원 찾기
    //                         </button>

    //                         {/* Mobile CTA buttons */}
    //                         <div className="pt-2 border-t border-gray-100 mt-2">
    //                             <Button
    //                                 size="sm"
    //                                 className="w-full justify-start px-3 py-2 mt-1 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-base font-medium"
    //                             >
    //                                 지금 진단하기
    //                             </Button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         </nav>