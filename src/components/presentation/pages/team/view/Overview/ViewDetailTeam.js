import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import 'react-tagsinput/react-tagsinput.css';
import moment from 'moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import getData from '../../../../../container/project/GetDetailProject';
// import numeral from 'numeral'
import './viewProject.css'
import TeamMember from '../../../project/viewProject/view/TeamMember';
import Chart from "react-apexcharts";
import { ClipLoader } from 'react-spinners';
import numeral from 'numeral'

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            loading: true,
            teamData: "",
            id: this.props.match.params.id,
            category: "",
            team: "",
            status: "",
            updatedAt: "",
            data: null,
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                },
                colors: ['#1491ff']
            },
            series: [
                {
                    name: "Milions",
                    data: []
                }
            ]
        };
    }
    async componentWillMount() {
        const teamInfor = await fetch('https://si-enclave.herokuapp.com/api/v1/teams/' + this.state.id)
        let teamInfo = await teamInfor.json()
        let totalSalary = 0
        teamInfo.engineers.forEach(element => {
            totalSalary += element.salary
            // console.log(new Date(element.birthday).getFullYear())
        });

        console.log(totalSalary)
        this.setState({
            name: teamInfo.name,
            createdAt: teamInfo.createdAt,
            projectsId: teamInfo.projects.id,
            engineers: teamInfo.engineers,
            cashOut: totalSalary
        })
        let res = await getData(this.state.projectsId)
        this.setState({
            project: {
                id: res.id,
                name: res.name,
                technology: res.technology,
                description: res.description,
                team: res.team ? res.team.name : "Do not have team",
                teamId: res.team ? res.team.id : null,
                category: res.category.name,
            }
        });
        let catData = [], seriesData1 = [];
        teamInfo.engineers.forEach((element) => {
            catData.push(element.firstName)
            seriesData1.push(parseInt(element.salary / 1000000));
        });
        let teamTable = teamInfo.engineers.map((value, key) => {
            this.setState({
                options: {
                    ...this.state.options,
                    xaxis: {
                        categories: catData
                    }
                },
                series: [
                    {
                        name: "Milions",
                        data: seriesData1
                    }
                ],
            })

            return (
                <TeamMember
                    key={key}
                    id={value.id}
                    avatar={value.avatar}
                    email={value.email}
                    firstName={value.firstName}
                    lastName={value.lastName}
                    role={value.role}
                    expYear={value.expYear}
                    birthday= {moment(value.birthday).format('DD/MM/YYYY')}
                    salary={numeral(value.salary).format('0,0') + " VND"}
                />
            )
        })
        this.setState({
            teamData: teamTable,
        })
    }
    render() {
        let team = this.state.team === "Do not have team" ? (
            <div className="portlet light bordered">
                <div className="portlet-title tabbable-line">
                    <div className="caption">
                        <i className=" icon-social-twitter font-dark hide" />
                        <span className={"label label-sm label-default"} style={{ fontSize: "15px" }}> {this.state.name} </span>
                    </div>
                </div>
            </div>
        ) : (
                <div className="portlet light bordered">
                    <div className="portlet-title tabbable-line">
                        <div className="caption">
                            <i className=" icon-social-twitter font-dark hide" />
                            <Link to={"/team/" + this.state.id} className={"label label-sm label-default"} style={{ fontSize: "15px" }}> MEMBER LIST </Link>
                        </div>
                    </div>
                    <div className="portlet-body4">
                        <div className="tab-content">
                            <div className="tab-pane active" id="tab_actions_pending">
                                {this.state.teamData}
                            </div>
                        </div>
                    </div>
                </div>
            )
        setTimeout(() => {
            this.setState({
                loadData: (<div className="portlet-body">
                    <div className="row">
                        <div className="col-lg-8 col-xs-8 col-sm-8">
                            <div className="portlet light bordered">
                                {team}
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-4 col-sm-4">
                            <div className="portlet light bordered">
                                <div className="portlet-title tabbable-line">
                                    <div className="caption">
                                        <i className=" icon-social-twitter font-dark hide" />
                                        <span className="caption-subject font-dark bold uppercase">finance</span>
                                    </div>
                                </div>
                                <div className="portlet-bodyx">
                                    <div className="tab-content">
                                        <div className="table-main-pagination">
                                            <div className="table-scrollable-custom">
                                                <table className="table table-striped table-bordered table-advance table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th width="50%">Cash Out </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th width="50%">{new Intl.NumberFormat().format(this.state.cashOut)} VND </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-xs-6 col-sm-6">
                                <div className="portlet light bordered">
                                    <div className="portlet-title tabbable-line">
                                        <NavLink to={`/project/${this.state.id}`} className="caption">
                                            <i className="icon-bubbles font-dark hide" />
                                            <span className="caption-subject font-dark bold uppercase">BASIC INFORMATION ABOUT PROJECT </span>
                                        </NavLink>
                                    </div>
                                    <div className="portlet-body3" >
                                        <div className="tab-content">
                                            <div className="portlet-body">
                                                <div className="general-item-list">
                                                    <div className="item">
                                                        <div className="item-head">
                                                            <div className="item-details">
                                                                <span className="item-name" >Project name</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-comment-text"> {this.state.project.name} </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="item-head">
                                                            <div className="item-details">
                                                                <span className="item-name">Description</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-comment-text"> {this.state.project.description}   </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="item-head">
                                                            <div className="item-details">
                                                                <span className="item-name">Technology</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-comment-text"> {this.state.project.technology}    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="portlet light bordered">

                                    <div className="portlet-title tabbable-line">
                                        <div className="caption">
                                            <i className="icon-bar-chart font-dark hide" />
                                            <span className="caption-subject font-dark bold uppercase">Salary</span>
                                        </div>
                                    </div>
                                    {/* chart here */}

                                    <div className="portlet-body">
                                        <div className="SalaryChart" >
                                            <Chart
                                                options={this.state.options}
                                                series={this.state.series}
                                                type="bar"
                                                width="100%"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    ),
                    loading: false
                })
            }, 1000);
            return (
            <div className="portlet light bordered">
                        <div className="portlet red box">
                            <div className="portlet-title">
                                <div className="caption">
                                    {this.state.name}
                                </div>
                            </div>
                            {this.state.loading ?
                                (<div className='sweet-loading'>
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={50}
                                        color={'#7ed6df'}
                                        loading={this.state.loading}
                                    />
                                </div>) : this.state.loadData}

                        </div>

                    </div>
                    )
                }
            }
export default EditForm;