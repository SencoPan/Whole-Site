import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import {addItem, deleteItem, getItems} from '../actions/itemActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class RefreshButton extends Component {
    state = {
        isOpen: true
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    getItem = () => {
        this.props.getItems();
    }

    render(){
        return (
        <div>
            <Button
                color={"dark"}
                style={{ marginBottom: "2rem" }}
                onClick={this.getItem}
            >Refresh
            </Button>
        </div>
        )
    }
}

RefreshButton.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(
    mapStateToProps, { getItems, deleteItem}
)(RefreshButton);