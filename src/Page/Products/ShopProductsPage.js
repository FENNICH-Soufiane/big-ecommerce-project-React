import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import Pagination from '../../Components/Uitily/Pagination'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import SideFilter from '../../Components/Uitily/SideFilter'
import ViewSearchProductsHook from '../../hook/products/view-search-products-hook'


const ShopProductsPage = () => {
    const [items, pagination, onPress, getProduct] = ViewSearchProductsHook()
    
    let pageCount
    if(pagination) {
        pageCount= pagination
    }else {
        pageCount = 0
    }
    

    return (
        <div style={{ minHeight: '670px' }}>
            <CategoryHeader />
            <Container>
                <SearchCountResult onClickk={getProduct} title={`هناك ${items.length} نتيجة بحث`} />
                <Row className='d-flex flex-row'>
                    <Col sm="2" xs="2" md="1" className='d-flex'>
                        <SideFilter />
                    </Col>
                    <Col sm="10" xs="10" md="11">
                         <CardProductsContainer products={items} title="" btntitle=""/>
                    </Col>
                </Row>
                {
                    pagination > 1 ? <Pagination pageCount={pageCount} onPress={onPress}/> : null
                }
                    
            </Container>
        </div>
    )
}

export default ShopProductsPage
