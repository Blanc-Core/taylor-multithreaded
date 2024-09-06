import React, { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, InputNumber, Button, Table, Modal, Select, Typography, Space, Card, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExportOutlined, SearchOutlined, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const OrderForm = ({ addOrder, visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        addOrder(values);
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            visible={visible}
            title="Add New Order"
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="supplier" label="Supplier Name" rules={[{ required: true, message: 'Please input the supplier name!' }]}>
                    <Input prefix={<ShoppingCartOutlined />} />
                </Form.Item>
                <Form.Item name="item" label="Item Name" rules={[{ required: true, message: 'Please input the item name!' }]}>
                    <Input prefix={<ShoppingCartOutlined />} />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number', min: 1, message: 'Please input a valid quantity!' }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0, message: 'Please input a valid price!' }]}>
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                        Add Order
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const OrderList = ({ orders, setOrders }) => {
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    const handleEdit = (record) => {
        setEditingOrder(record);
        form.setFieldsValue(record);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this order?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                setOrders(orders.filter(order => order.id !== id));
            },
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setOrders(orders.map(order => order.id === editingOrder.id ? { ...order, ...values } : order));
            setEditingOrder(null);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.supplier.toLowerCase().includes(value.toLowerCase()) ||
                record.item.toLowerCase().includes(value.toLowerCase()),
        },
        { title: 'Item', dataIndex: 'item', key: 'item' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`,
        },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Input
                placeholder="Search orders..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
            />
            <Modal
                visible={!!editingOrder}
                title="Edit Order"
                onCancel={() => setEditingOrder(null)}
                footer={[
                    <Button key="cancel" onClick={() => setEditingOrder(null)}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                {editingOrder && (
                    <Form form={form} layout="vertical">
                        <Form.Item name="supplier" label="Supplier" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="item" label="Item" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number', min: 1 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                            <Select>
                                <Option value="Pending">Pending</Option>
                                <Option value="Completed">Completed</Option>
                                <Option value="Cancelled">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

const ExportButton = ({ orderList }) => {
    const [fileFormat, setFileFormat] = useState('CSV');

    const handleExport = () => {
        if (orderList.length === 0) {
            Modal.warning({
                title: 'No Data',
                content: 'No orders available for export.',
            });
            return;
        }

        try {
            const data = orderList.map(order => ({
                id: order.id,
                supplier: order.supplier,
                item: order.item,
                quantity: order.quantity,
                price: order.price,
                status: order.status,
            }));

            if (fileFormat === 'CSV') {
                const csvContent = "data:text/csv;charset=utf-8," 
                    + data.map(e => Object.values(e).join(",")).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "purchase_orders.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Orders");
                XLSX.writeFile(wb, "purchase_orders.xlsx");
            }

            Modal.success({
                title: 'Export Successful',
                content: `Your data has been exported as a ${fileFormat} file.`,
            });
        } catch (error) {
            console.error('Export failed:', error);
            Modal.error({
                title: 'Export Failed',
                content: 'There was an error exporting your data. Please try again.',
            });
        }
    };

    return (
        <Space>
            <Select defaultValue="CSV" style={{ width: 120 }} onChange={value => setFileFormat(value)}>
                <Option value="CSV">CSV</Option>
                <Option value="Excel">Excel</Option>
            </Select>
            <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
                Export
            </Button>
        </Space>
    );
};

const DashboardContainer = () => {
    const [orders, setOrders] = useState([
        { id: 1, supplier: 'Supplier A', item: 'Item 1', quantity: 10, price: 100, status: 'Pending', date: '2023-01-01' },
        { id: 2, supplier: 'Supplier B', item: 'Item 2', quantity: 5, price: 50, status: 'Completed', date: '2023-01-15' },
        { id: 3, supplier: 'Supplier C', item: 'Item 3', quantity: 8, price: 75, status: 'Pending', date: '2023-02-01' },
        { id: 4, supplier: 'Supplier A', item: 'Item 4', quantity: 12, price: 120, status: 'Completed', date: '2023-02-15' },
        { id: 5, supplier: 'Supplier B', item: 'Item 5', quantity: 6, price: 60, status: 'Cancelled', date: '2023-03-01' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const addOrder = (orderData) => {
        const newOrder = {
            id: orders.length + 1,
            ...orderData,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
        };
        setOrders([...orders, newOrder]);
    };

    const totalOrders = orders.length;
    const totalValue = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
    const averageOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;

    // Supplier Distribution Chart
    const getSupplierDistributionOption = () => {
        const supplierData = orders.reduce((acc, order) => {
            acc[order.supplier] = (acc[order.supplier] || 0) + 1;
            return acc;
        }, {});
        const data = Object.entries(supplierData).map(([name, value]) => ({ name, value }));

        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data.map(item => item.name)
            },
            series: [
                {
                    name: 'Supplier Distribution',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
    };

    // Order Status Chart
    const getOrderStatusOption = () => {
        const statusData = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});
        const data = Object.entries(statusData).map(([name, value]) => ({ name, value }));

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Order Status',
                    type: 'bar',
                    barWidth: '60%',
                    data: data.map(item => ({
                        value: item.value,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ])
                        }
                    }))
                }
            ]
        };
    };

    // Order Value Trend Chart
    const getOrderValueTrendOption = () => {
        const trendData = orders.sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(order => [order.date, order.price * order.quantity]);

        return {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return `${params.name} : $ ${params.value[1]}`;
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: 'Order Value',
                type: 'line',
                showSymbol: false,
                data: trendData,
                lineStyle: {
                    color: '#5470C6',
                    width: 3
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    }, {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }])
                }
            }]
        };
    };

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <Menu.Item key="2">Analytics</Menu.Item>
                    <Menu.Item key="3">Settings</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Total Orders"
                                    value={totalOrders}
                                    prefix={<ShoppingCartOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Total Order Value"
                                    value={totalValue}
                                    precision={2}
                                    prefix={<DollarOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Average Order Value"
                                    value={averageOrderValue}
                                    precision={2}
                                    prefix={<DollarOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={12}>
                            <Card title="Supplier Distribution">
                                <ReactECharts
                                    option={getSupplierDistributionOption()}
                                    style={{ height: '400px' }}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Order Status">
                                <ReactECharts
                                    option={getOrderStatusOption()}
                                    style={{ height: '400px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <Card title="Order Value Trend">
                                <ReactECharts
                                    option={getOrderValueTrendOption()}
                                    style={{ height: '400px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <Card>
                                <Space style={{ marginBottom: 16 }}>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                                        Add Order
                                    </Button>
                                    <ExportButton orderList={orders} />
                                </Space>
                                <OrderList orders={orders} setOrders={setOrders} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            <OrderForm
                addOrder={addOrder}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />
        </Layout>
    );
};

export default DashboardContainer;