import React, { useMemo, useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
  Content,
  Theme,
} from "@carbon/react";
import { LogoGithub, Edit, Help } from "@carbon/icons-react";

import OverviewPage from "./pages/overview.mdx";
import OnboardingPage from "./pages/onboarding-and-setup.mdx";
import PromptsPage from "./pages/prompts.mdx";

import { mdxComponents } from "./components/mdx/mdx-components";
import "./styles.scss";

function MdxPage({ Component }: { Component: React.ComponentType<any> }) {
  // With MDX Rollup, we can pass `components` to override tags/components.
  return <Component components={mdxComponents} />;
}

function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1056);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close side nav when route changes on mobile
  useEffect(() => {
    if (!isLargeScreen) {
      setIsSideNavExpanded(false);
    }
  }, [location.pathname, isLargeScreen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1056;
      setIsLargeScreen(largeScreen);
      if (!largeScreen) {
        setIsSideNavExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Overview", to: "/overview" },
      { label: "Onboarding and setup", to: "/onboarding-and-setup" },
      { label: "Prompts", to: "/prompts" },
    ],
    []
  );

  const isActive = (to: string) => location.pathname === to;

  const onNav = (to: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <Theme theme="g10">
      <Header aria-label="Carbon MCP">
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#/overview" prefix="">
          Carbon MCP
        </HeaderName>

        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="GitHub"
            onClick={() => window.open("https://github.com/carbon-design-system/carbon-mcp", "_blank")}
          >
            <LogoGithub size={20} />
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="Provide Feedback"
            onClick={() =>
              window.open("https://github.com/carbon-design-system/carbon-mcp/issues/new?template=PROVIDE_FEEDBACK.yaml", "_blank")
            }
          >
            <Edit size={20} />
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="Support"
            onClick={() =>
              window.open("https://github.com/carbon-design-system/carbon-mcp/issues/new?template=REQUEST_SUPPORT.yaml", "_blank")
            }
          >
            <Help size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <SideNav
        aria-label="Carbon MCP navigation"
        expanded={isLargeScreen ? true : isSideNavExpanded}
        isFixedNav
        isPersistent={isLargeScreen}
        onOverlayClick={() => setIsSideNavExpanded(false)}
        onSideNavBlur={() => setIsSideNavExpanded(false)}
      >
        <SideNavItems>
          {navItems.map((item) => (
            <SideNavLink
              key={item.to}
              href={`#${item.to}`}
              isActive={isActive(item.to)}
              onClick={onNav(item.to)}
            >
              {item.label}
            </SideNavLink>
          ))}
        </SideNavItems>
      </SideNav>

      <Content id="main-content">
        <main className="page-content mdx-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<MdxPage Component={OverviewPage} />} />
            <Route path="/onboarding-and-setup" element={<MdxPage Component={OnboardingPage} />} />
            <Route path="/prompts" element={<MdxPage Component={PromptsPage} />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <small>© {new Date().getFullYear()} IBM Corporation</small>
            <div className="footer-links">
              <a href="https://github.com/carbon-design-system/carbon-mcp/blob/main/TERMS_OF_USE.md" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>
              <span className="footer-separator">|</span>
              <a href="https://www.ibm.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </Content>
    </Theme>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
