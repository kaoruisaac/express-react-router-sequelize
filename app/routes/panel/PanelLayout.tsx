import { useTranslation } from "react-i18next";
import { Outlet, Link, useLocation } from "react-router";
import { Styled } from "remix-component-css-loader"
import { RiLogoutBoxRLine } from "@remixicon/react";
import { useServerContext } from "~/containers/serverContext";
import "./PanelLayout.css";
import usePopUp from "~/containers/PopUp/usePopUp";
import { useCallback } from "react";
import NotifyPopUp from "~/components/NotifyPopUp";

const PanelLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { employee } = useServerContext();
  const { PopUpBox } = usePopUp();

  const navigationItems = [
    { name: t("home"), href: "/panel", icon: "🏠" },
    { name: t("employees"), href: "/panel/employees", icon: "👥" },
  ];

  const confirmLogout = useCallback(() => {
    PopUpBox(NotifyPopUp, {
      title: t("logout"),
      message: t("confirm-logout"),
      onConfirm: () => {
        window.location.href = "/api/auth/panel/logout";
      },
    });
  }, [PopUpBox, t])

  return (
    <Styled>
      <div className="panel-layout">
        {/* 側邊欄 */}
        <aside className="panel-sidebar">
          {/* 標題區域 */}
          <div className="panel-header">
            <h1 className="panel-title">管理面板</h1>
            <p className="panel-subtitle">歡迎回來</p>
          </div>

          {/* 導航選單 */}
          <nav className="panel-nav">
            <div className="panel-nav-list">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`panel-nav-item ${location.pathname === item.href ? 'active' : ''}`}
                >
                  <span className="panel-nav-icon">{item.icon}</span>
                  <span className="panel-nav-text">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* 底部用戶資訊 */}
          <div className="panel-user-info">
            <div className="panel-user-container">
              <div className="panel-user-avatar">
                <span className="panel-user-avatar-text">U</span>
              </div>
              <div className="panel-user-details">
                <p className="panel-user-name">{employee?.name || '---'}</p>
                <p className="panel-user-role">{employee?.roles || '---'}</p>
              </div>
                             <button
                 onClick={confirmLogout}
                 className="panel-logout-btn"
                 title={t("logout")}
               >
                 <RiLogoutBoxRLine className="panel-logout-icon" />
               </button>
            </div>
          </div>
        </aside>

        {/* 主要內容區域 */}
        <main className="panel-main">
          <Outlet />
        </main>
      </div>
    </Styled>
  )
}

export default PanelLayout;