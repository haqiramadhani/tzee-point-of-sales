import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';

export default class MenuExampleInverted extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted fixed='top'>
        <Link to='/'>
        <Menu.Item
          name='POS'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        /></Link>
        <Link to='/products'>
        <Menu.Item
          name='products'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        /></Link>
        <Link to='/categories'>
        <Menu.Item
          name='category'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        /></Link>
        <Link to='/purchases'>
        <Menu.Item
          name='purchase'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        /></Link>
        <Link to='/sales'>
        <Menu.Item
          name='sales'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        /></Link>
      </Menu>
    )
  }
}