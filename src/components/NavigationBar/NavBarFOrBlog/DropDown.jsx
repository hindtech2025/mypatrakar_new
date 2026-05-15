import React from "react";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import "../NavBarFOrBlog/DropDown.css";
import { Link, NavLink } from "react-router-dom";
import { faGlobe, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import "../../../i18n";
function DropDown() {
  const { t } = useTranslation();

  return (
    <div>
      <Dropdown
        title={
          <span className="custom-title">{t("menu.product.product")}</span>
        }
        className="custom-dropdown py-3 "
      >
        <NavLink
          to={"/product/website"}
          className={" no-underline hover:no-underline"}
        >
          <Dropdown.Item className="custom-dropdown-item hover:text-red-600 hover:no-underline">
            <FontAwesomeIcon icon={faGlobe} className="w-5" />
            {t("menu.product.website")}
          </Dropdown.Item>
        </NavLink>
        <Link
          to={"/product/app"}
          className="hover:text-red-600 hover:no-underline"
        >
          <Dropdown.Item className="custom-dropdown-item">
            <FontAwesomeIcon icon={faMobileAlt} className="w-5" />
            {t("menu.product.app")}
          </Dropdown.Item>
        </Link>
      </Dropdown>
    </div>
  );
}

export default DropDown;
