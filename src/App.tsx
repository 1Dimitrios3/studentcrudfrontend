import React, { useState, useEffect } from 'react';
import { 
  Breadcrumb, 
  Layout, 
  Menu
} from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import RenderTable from './RenderTable';
import { renderStudentColumns } from './TableColumns';
import { deleteStudent, getAllStudents } from './service';
import { Student, MenuItem, getItem } from './types';
import './App.css';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { successNotification } from './Notification';

const items: MenuItem[] = [
  getItem('Users', '1', <TeamOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')])
];

const backGroundColor = 'rgba(255, 255, 255, 0.2)';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchStudents = () => {
    setIsFetching(true);
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data)
        setIsFetching(false);
      });
  }

  const removeStudent = (studentId: number, callback: () => void) => {
    deleteStudent(studentId)
      .then(() => {
        successNotification("Student deleted", `Student with id: ${studentId} was successfully deleted`);
        callback();
      });
  }

      useEffect(() => {
        fetchStudents();
      }, []);

  return(
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: backGroundColor }} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: backGroundColor }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 360, background: backGroundColor }}>
          <RenderTable 
            data={students} 
            columns={renderStudentColumns(fetchStudents, removeStudent)} 
            isFetching={isFetching}
            fetchData={fetchStudents}
            drawerTitle='Create a new student'
            btnTitle='Add New Student' 
             
            />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>By Dimitris</Footer>
    </Layout>
  </Layout>
  )
}

export default App;
