import {takeLatest} from 'redux-saga/effects'
import { GET_PRODUCTS } from '../products/index'
import { handleGetProducts } from './handlers/products'

//watch function
export function* watcherSaga() {
    yield takeLatest(GET_PRODUCTS, handleGetProducts)
}