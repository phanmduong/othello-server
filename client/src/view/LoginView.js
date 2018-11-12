import React, {Component} from 'react';
import {Modal} from "antd";
import Form from "./common/Form";
import FormInput from "./common/FormInput";
import FormButton from "./common/FormButton";
import {observer} from "mobx-react";
import store from "../Store";

@observer
class ModalFormNameComponent extends Component {

    render() {
        return (
            <Modal
                title="Điền tên của bạn"
                visible={store.visibleModalName}
                footer={null}
                closable={false}
            >
                <Form onSubmit={this.props.submitUsername}>
                    <FormInput
                        name="name"
                        suffixClear
                        placeholder="Nhập tên của bạn"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên của bạn!"
                            }
                        ]}

                    />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FormButton
                            type="primary"
                            htmlType="submit"
                        >
                            Đăng nhập
                        </FormButton>
                    </div>
                </Form>
            </Modal>
        );
    }
}

export default ModalFormNameComponent;
