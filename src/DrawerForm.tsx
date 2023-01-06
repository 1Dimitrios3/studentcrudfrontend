import { Drawer, Button } from 'antd';
import StudentForm from './StudentForm';

type DrawerTypes = {
    title: string;
    showDrawer: boolean;
    setShowDrawer: (el: boolean) => void
    fetchData: () => void
} 

const DrawerForm = ({
        showDrawer, 
        setShowDrawer, 
        title,
        fetchData
    }: DrawerTypes) => {
    const onCLose = () => setShowDrawer(false);

    return <Drawer
        title={title}
        width={720}
        onClose={onCLose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
       <StudentForm
         onClose={onCLose}
         fetchStudents={fetchData}
       />
    </Drawer>
}

export default DrawerForm;