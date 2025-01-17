import React, { Component } from 'react'
import Select from 'react-select';

const roleOfMember = []

export default class MemberOption extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listMembers: [],
            memberSelected: this.props.data ? this.props.data.member : null,
            roleSelected: this.props.data ? this.props.data.role : { value: "member", label: 'MEMBER' },
            error: "",
            checkValidate: false,
            role: roleOfMember
        }
    }

    handleMemberChange = async (selectOption) => {
        this.setState({ error: null })
        await this.setState({ memberSelected: selectOption })
        this
            .props
            .handleExpand({
                data: {
                    id: this.state.memberSelected.value,
                    role: this.state.roleSelected.value
                },
                index: this.props.keyIndex
            });
    }
    handleRoleChange = async (selectOption) => {

        await this.setState({ roleSelected: selectOption })
        this
            .props
            .handleExpand({
                data: {
                    id: this.state.memberSelected.value,
                    role: this.state.roleSelected.value
                },
                index: this.props.keyIndex
            });

    }


    handleRemoveItem = (e) => {
        e.target.parentNode.parentNode.parentNode.remove()  
        this
            .props
            .handleExpand({
                data: {
                    id: this.state.memberSelected ? this.state.memberSelected.value : null,
                    role: this.state.roleSelected
                },
                index: this.props.keyIndex,
                isDeleted: true
            });
    }
    render() {
        return (
            <div className="MemberOption" id={`member_select_${this.props.keyIndex}`}>
                <div className="row relative">
                    {this.props.keyIndex !== 0
                        ? <div className="border-close">
                            <div className="close close-member" onClick={(e) => this.handleRemoveItem(e)}></div>
                        </div>
                        : ''}

                    <div className="col-xs-6">
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    Member:
                                </label>
                                {this.state.error}
                                <Select
                                    value={this.state.memberSelected}
                                    options={this.props.options}
                                    onChange={this.handleMemberChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                   Role: 
                                </label>
                                <Select
                                    defaultValue={roleOfMember[1]}
                                    value={this.state.roleSelected}
                                    options={[
                                        {
                                            value: "MEMBER",
                                            label: "MEMBER",
                                        },
                                        {
                                            value: "QA",
                                            label: "QA"
                                        },
                                        {
                                            value: "LEADER",
                                            label: "LEADER",
                                        }
                                    ]}
                                    onChange={this.handleRoleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
