import React from "react";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import "./Login.css";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { error } from "console";

const onFinish = (values: any) => {
  authService.login(values).catch(error => console.log(error));
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="clientType"
      valuePropName="value"
      wrapperCol={{ offset: 8, span: 16 }}
      initialValue={0}
    >
      <Radio.Group defaultValue={0}>
        <Radio value={0}>Comapny</Radio>
        <Radio value={1}>Admin</Radio>
        <Radio value={8}>Customer</Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
