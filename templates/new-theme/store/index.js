import vuex from 'vuex'

const createStore = () => {
    return new vuex.Store({
        state: () =>{
            return{
                cart: [],
                wishlist: [],
                isIos: false,
                loading:true,
                isPreview:false,
                seo: { 
                    title: '',
                    description: '', 
                    keywords: [], 
                    url: '', 
                    image: '', 
                    metaTags: [], 
                    scripts: [] 
                },
                settings: null,
                domain: 'www.storeino.com',
                apps: [],
                token: null,
                baseURL: 'https://api-stores.storeino.world/api',
                currency: { symbol: "DH", code: undefined },
                language: { name: "Unknown", code: undefined }
            }
        },
        actions: ()=>{},
        mutations:()=>{},
        getters:()=>{},
    })
}
export default createStore
