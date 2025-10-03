import React from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Card,
    message
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/apiService';

const EmployeeAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Định dạng lại ngày tháng trước khi gửi
        const formattedValues = {
            ...values,
            timeOnboard: values.timeOnboard.format('YYYY-MM-DD'),
        };

        try {
            await createEmployee(formattedValues);
            message.success('Thêm nhân viên mới thành công!');
            navigate('/'); 
        } catch (error) {
            console.error('Lỗi khi thêm nhân viên:', error);
            message.error('Có lỗi xảy ra, có thể Mã nhân viên đã tồn tại.');
        }
    };

    return (
        <Card title="Thêm Nhân Viên Mới">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="code"
                    label="Mã Nhân Viên"
                    rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên!' }]}
                >
                    <Input placeholder="Ví dụ: NV001" />
                </Form.Item>

                <Form.Item
                    name="fullName"
                    label="Họ và Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input placeholder="Ví dụ: Nguyễn Văn A" />
                </Form.Item>

                <Form.Item
                    name="timeOnboard"
                    label="Thời Gian Onboard"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày onboard!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="viTriCongViec"
                    label="Vị Trí Công Việc"
                    rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
                >
                    <Input placeholder="Ví dụ: Lập trình viên Backend" />
                </Form.Item>

                <Form.Item
                    name="salary"
                    label="Lương Cứng (VND)"
                    rules={[{ required: true, message: 'Vui lòng nhập lương cứng!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                </Form.Item>

                <Form.Item
                    name="bonus"
                    label="Phụ Cấp (VND)"
                    rules={[{ required: true, message: 'Vui lòng nhập phụ cấp!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm Nhân Viên
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default EmployeeAdd;