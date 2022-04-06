import * as actionTypes from '../actions/actionTypes';

export const productListReducer = (state={products:[]},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_LIST_REQUEST : 
            return {loading:true,products:[]}
        case actionTypes.PRODUCT_LIST_SUCCESS :
            return {loading:false,products:action.payload}
        case actionTypes.PRODUCT_LIST_FAIL :
            return {loading:false,error:action.payload}
        case actionTypes.PRODUCT_LIST_RESET :
            return {products:[]}           
        default :
            return state;
    }
}

export const productDetailsReducer = (state={product:{reviews:[]}},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_DETAILS_REQUEST : 
            return {loading:true, ...state}
        case actionTypes.PRODUCT_DETAILS_SUCCESS :
            return {loading:false,product:action.payload}
        case actionTypes.PRODUCT_DETAILS_FAIL :
            return {loading:false,error:action.payload}
        default :
            return state;
    }
}

export const productDeleteReducer = (state={},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_DELETE_REQUEST : 
            return {loading:true}
        case actionTypes.PRODUCT_DELETE_SUCCESS :
            return {loading:false,success:true}
        case actionTypes.PRODUCT_DELETE_FAIL :
            return {loading:false,error:action.payload} 
        default :
            return state;
    }
}

export const productCreateReducer = (state={},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_CREATE_REQUEST : 
            return {loading:true}
        case actionTypes.PRODUCT_CREATE_SUCCESS :
            return {loading:false,success:true,product:action.payload}
        case actionTypes.PRODUCT_CREATE_FAIL :
            return {loading:false,error:action.payload}
        case actionTypes.PRODUCT_CREATE_RESET:
            return {}
        default :
            return state;
    }
}

export const productUpdateReducer = (state={product:{}},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_UPDATE_REQUEST : 
            return {loading:true}
        case actionTypes.PRODUCT_UPDATE_SUCCESS :
            return {loading:false,success:true,product:action.payload}
        case actionTypes.PRODUCT_UPDATE_FAIL :
            return {loading:false,error:action.payload}
        case actionTypes.PRODUCT_UPDATE_RESET:
            return {}
        default :
            return state;
    }
}


export const productCreateReviewReducer = (state={},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST : 
            return {loading:true}
        case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false,success:true}
        case actionTypes.PRODUCT_CREATE_REVIEW_FAIL :
            return {loading:false,error:action.payload}
        case actionTypes.PRODUCT_CREATE_REVIEW_RESET :
            return {}
        default :
            return state;
    }
}