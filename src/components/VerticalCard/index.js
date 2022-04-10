import React from "react";
import { Row, Button, Typography, Space, Popconfirm } from 'antd';
import { RightOutlined, LeftOutlined, DeleteOutlined } from "@ant-design/icons";

export function VerticalCard({ idx, task, updateStage, onDelete }) {
    return (
        <Row span={6} key={idx.toString()}>
            <Space direction="horizontal" style={{
                justifyContent: "space-between",
                alignContent: "center",
                background: "#fafafa",
                flex: 1,
                padding: 8,
                marginBlock: 4,
            }}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined />}
                    disabled={task.stage === 0}
                    onClick={() => updateStage(task, false)}
                />
                <Typography.Text style={{ fontSize: '20px' }}>
                    {task.name}
                </Typography.Text>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined />}
                    disabled={task.stage === 3}
                    onClick={() => updateStage(task, true)}
                />
                <Popconfirm
                    placement="top"
                    title={'Are you sure to delete this task?'}
                    onConfirm={() => onDelete(task)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: '24px', color: 'red' }} />
                </Popconfirm>
            </Space>
        </Row>
    )
}