import {call, put} from 'redux-saga/effects'
import { setProducts } from '../../products';
import { requestGetProducts } from '../requests/products'

type WhatYouYield="foo"


export function* handleGetProducts():Generator<any> {
    try{
        const response = yield call(requestGetProducts)
        const {data}:any = response;
        yield put(setProducts(data))
    } catch (err) {
        console.log(err);
    }
}