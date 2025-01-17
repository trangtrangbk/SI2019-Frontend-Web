import React, { Component } from 'react';
import RowData from './RowData';
import Pagination from "react-js-pagination";
import Preloader from '../../../include/Preloader'
import getTeamPag from '../../../../container/team/GetTeamPagination';
import AddTeam from '../add/AddTeam';
import Modal from '../../../commons/modal/Modal';
import getTeam from '../../../../container/team/GetTeam';
import Message from '../../../commons/msg/Message'

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMessage: false,
      data: [],
      itemsCountPerPage: 10,
      totalItemsCount: 0,
      pageRangeDisplayed: 5,
      activePage: 0,
      isOpen: false
    }
  }
  toggleMessage = () => {
    this.setState({ isOpenMessage: !this.state.isOpenMessage })
    this.reloadData()
  }
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber - 1 })
    this.componentWillMount();
  }
  async componentWillMount() {
    const res0 = await getTeam();
    this.setState({ totalItemsCount: res0.total })
    let offset = ((this.state.activePage) * (this.state.itemsCountPerPage))
    const res = await getTeamPag(this.state.itemsCountPerPage, offset);
    let dataRender = res.results.map((value, key) => (
      <RowData
        key={key}
        id={value.id}
        name={value.name}
        totalMember={value.totalMember}
        projectName={value.projectName}
        reloadData={() => { this.reload() }}
      />
    )
    )
    this.setState({
      data: dataRender
    })
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  reloadData = () => {
    this.setState({ isOpen: false })
    this.componentWillMount()
  }
  reload = () => {
    this.componentWillMount()
  }
  render() {
    const loader = this.state.data.length > 0 ?
      <div className="table-main-pagination">
        <div className="table-scrollable">
          <table className="table table-striped table-bordered table-advance table-hover">
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold' }}>Team name </th>
                <th style={{ fontWeight: 'bold' }}>Total member </th>
                <th style={{ fontWeight: 'bold' }}>Project name </th>
                <th style={{ fontWeight: 'bold' }}>Action </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data}
            </tbody>
          </table>
        </div>
        <div className="PaginationArea" style={{ textAlign: "center" }}>
          <Pagination
            activePage={this.state.activePage + 1}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={this.state.pageRangeDisplayed}
            onChange={this.handlePageChange}
            itemClass='page-item'
          />
        </div>
      </div> : <Preloader />
    return (
      <div className="TableArea">
        <div className="portlet-title">
          <div className="caption" style={{ color: 'black', fontSize: '25px', paddingBottom: '13px ' }}>Team List ({this.state.totalItemsCount}) </div>
          <div style={{ paddingBottom: '20px' }}>
            <div style={{ width: '200px', float: 'left' }}>
              <button onClick={this.toggleModal} className="btn btn-outline green btn-sm green "> Add  </button>
            </div>
            <div className="search-form" style={{ float: 'right', width: '200px', backgroundColor: '#B9ECF0' }} >
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search here" name="query" />
                <span className="input-group-btn">
                  <a href="abc" className="btn md-skip submit">
                    <i className="fa fa-search" />
                  </a>
                </span>
              </div>
            </div>
          </div>
          <br />
          <div className="portlet-body">
            {loader}
          </div>
        </div>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          <AddTeam reloadData={this.props.reload} onClose={this.toggleModal} onReload={this.reloadData}
            openMessage={this.toggleMessage} />
        </Modal>
        <Modal show={this.state.isOpenMessage}
          onClose={this.toggleMessage} deleteStyleModel={true} >
          <Message message={"Add successfully new team."} />
        </Modal>
      </div>
    );
  }
}
export default TableData;