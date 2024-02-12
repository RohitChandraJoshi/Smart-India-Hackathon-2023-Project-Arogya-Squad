  import React from 'react';
  import { NavLink } from 'react-router-dom';
  import { Layout, Menu, Typography } from 'antd';
  import Icon from '@ant-design/icons';
  import './logo.png'
  import routes from '../Routes/routes';

  const { Title } = Typography;
  const { Sider } = Layout;

  const SideMenu = () => {
    const imageUrl = require('./logo.png');
    return (
      <Sider 
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: '100vh',
        float: 'right',
        width: '100px',
        background: 'linear-gradient(to right, #e0e0e0, #ffffff)', // Adjust the gradient colors
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add shadow
        position: 'relative',
      }}
      >
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} > {/* You can add any additional class for styling */}
        <img
          src= {imageUrl}
          alt="Your Image Alt Text"
          style={{
            alignItems:'center',
            maxWidth: '100%', // Set the maximum width of the image
            height: '60px', // Allow the height to adjust proportionally
          }}
        />
      </div>
        <Menu theme="white" mode="inline" defaultSelectedKeys={['Doctors']} style={{  }}>
          {routes.map((route, index) => (
            <>
              {route.visibleOnMenu && (
                <Menu.Item key={route.title} icon={<Icon component={route.icon} />}>
                  <NavLink to={route.path}>{route.title}</NavLink>
                </Menu.Item>
              )}
            </>
          ))}
        </Menu>
      </Sider>
    );
  };

  export default SideMenu;
