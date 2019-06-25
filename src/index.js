import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component{
    render(){
    return (
        <tr>
            <th colSpan="2">{this.props.productCategory}</th>
        </tr>
    );
  }
}

class ProductRow extends React.Component{
    render(){
        const product = this.props.product
        const name = product.stocked ? product.name 
                    : <span style={{color:'red'}}>{product.name}</span>

        return (
            <tr>
              <td>{name}</td>
              <td>{product.price}</td>
            </tr>
        );
  }
}

class ProductTable extends React.Component{
    render(){
        let products = this.props.products
        const filterText = this.props.filterText
        const inStockOnly = this.props.inStockOnly

        products = products.filter((item) => inStockOnly ? item.name.includes(filterText) && item.stocked : item.name.includes(filterText));
        
        const rows = []
        let category = null
        products.forEach((item)=>{
            if(item.category!==category){
                const categoryRow = <ProductCategoryRow key={item.category} 
                                     productCategory={item.category} />
                rows.push(categoryRow)
            }
            const productRow = <ProductRow key={item.name} product={item} />
            rows.push(productRow)
            category = item.category
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
  }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }
    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value)
    }
    handleInStockChange(){
        this.props.onInStockChange()
    }

    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        return (
            <form>
                <input type="text" value={filterText} onChange={this.handleFilterTextChange} 
                 placeholder="Search..." />
                <br/>
                <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockChange} />
                Only show products in stock
            </form>
        );
  }
}

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filterText:'',
            inStockOnly:false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(value){
        this.setState({filterText:value})
    }

    handleInStockOnlyChange(){
        this.setState({inStockOnly:!this.state.inStockOnly})
    }

    render(){
    return (
        <div>
            <SearchBar filterText={this.state.filterText} 
                       inStockOnly={this.state.inStockOnly}
                       onFilterTextChange={this.handleFilterTextChange}
                       onInStockChange={this.handleInStockOnlyChange} />
            <ProductTable products={this.props.products} 
                          filterText={this.state.filterText} 
                          inStockOnly={this.state.inStockOnly} />
        </div>
    );
  }
}

const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

ReactDOM.render(
    <FilterableProductTable products={products} />,
    document.getElementById("root")
)