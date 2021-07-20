import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

class Category {
    constructor() {

    }

    // 카테고리 배열
    @observable business_arr = [];
    
    // 업체 분류 배열
    @observable category_arr = [];
    
    // 지역 배열
    @observable region_arr = [];
    
    // 공정 배열
    @observable develop_arr = [];