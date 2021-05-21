import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Item, SubMenu, ItemGroup } = Menu;
const Header = () => {
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreOutlined />} title="Hello">
        <Link href="/">HOME</Link>
      </Item>
      <Item icon={<LoginOutlined />} className="float-right">
        <Link href="/login">Login</Link>
      </Item>

      <Item icon={<UserAddOutlined />} className="float-right">
        <Link href="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
