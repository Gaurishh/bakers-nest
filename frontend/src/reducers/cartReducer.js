const isSameLine = (a, b) => a._id === b._id && a.varient === b.varient

export const cartReducer=(state={cartItems : []} , action)=>{

    switch (action.type)
    {
        case 'ADD_TO_CART' :

        const alreadyExists = state.cartItems.find(item=> isSameLine(item, action.payload))
        if(alreadyExists)
        {
               return{
                   ...state ,
                   cartItems : state.cartItems.map(item=> isSameLine(item, action.payload) ? action.payload : item)
               }
        }
        else{
        return{

            ...state ,
            cartItems:[...state.cartItems , action.payload]

        }
    }
    case 'DELETE_FROM_CART' : return{

        ...state ,
        cartItems : state.cartItems.filter(item => !isSameLine(item, action.payload))

    }
    case 'EMPTY_CART' : return{

        ...state,
        cartItems : []

    }
       default : return state
    }


}
