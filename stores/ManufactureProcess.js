import { observable, action, makeObservable } from 'mobx';
import Proposal from './Proposal';

import * as ManufactureProcessAPI from 'axios/ManufactureProcess';
class ManufactureProcess {
	/* 
  
  + import makeObservable

  constructor(value){
    mskeObservable(this)
  }

  */

	constructor() {
		makeObservable(this);
	}
	@observable title_list = [];
	@observable SelectChecked = '';
	@observable SelectedItem = null;
	@observable EstimateDataForDrawing = [];
	@observable MaxPrice = 0;
	@observable MinPrice = 0;
	@observable totalMinPrice = 0;
	@observable totalMaxPrice = 0;
	@observable moldPrice = 0;
	@observable ejaculationPrice = 0;
	@observable productionPrice = 0;
	@observable message = '';
	@observable ManufactureProcessList = [];
	@observable selectedBigCategory = null;
	@observable selectedMidCategory = null;
	@observable midCategorySet = [];
	@observable categoryDefaultValue = {
		big: null,
		mid: null,
	};

	// 수량 변수
	@observable quantity = 0;

	// 파일을 하나 이상 올렸는지에 대한 여부 검사 변수
	@observable checkFileUpload = false;

	// 금액 관련 변수
	@observable dataPrice = [];
	@observable orderPrice = 0;
	@observable totalorderPrice = 0;

	@observable calendar_checked = false;
	@observable date_conference = false;
	@observable date_undefined = false;

	// 참고 파일 관련 변수
	@observable file = '';
	@observable fileName = '';
	@observable fileArray = [];
	@observable openFileArray = [];
	@observable privateFileArray = [];

	// 기타 요청사항 변수
	@observable requestComment = '';
	@observable requestComment2 = '';

	@observable checkPaymentButton = false;

	@action countQuantity = data => {
		data.map((item, idx) => {
			console.log(item);
		});
	};

	@action init = async () => {
		await ManufactureProcessAPI.loadTitle().then(res => {
			this.title_list = res.data;
			console.log(this.title_list);

			const arr = [...res.data.data];
			console.log(arr);

			this.ManufactureProcessList = []; //초기화

			for (let i = 0; i < arr.length; i++) {
				console.log('a' + arr.length);
				this.ManufactureProcessList.push({ name: arr[i].name, id: arr[i].id, detail: [] });

				for (let j = 0; j < arr[i].detailManufactureProcess.length; j++) {
					// console.log("b"+arr[i].detailManufactureProcess.length)
					this.ManufactureProcessList[i].detail.push({
						name: arr[i].detailManufactureProcess[j].name,
						id: arr[i].detailManufactureProcess[j].id,
					});
				}
			}
			console.log(this.ManufactureProcessList);
		});
		this.setDefaultValue('금형사출');
		this.reset();
	};

	@action setQuantity = val => {
		console.log(val);
		this.quantity = val;
	};

	@action setBigCategory = e => {
		this.selectedBigCategory = e;
		// this.midCategorySet = e.detail;
		console.log(this.selectedBigCategory);
		this.selectedMidCategory = e.detail[0];
	};

	@action setMidCategory = e => {
		this.selectedMidCategory = e;
		console.log('setMidCategory()');
	};

	@action reset = async () => {
		this.SelectChecked = '';
		this.MinPrice = 0;
		this.MaxPrice = 0;
		this.totalMinPrice = 0;
		this.totalMaxPrice = 0;
	};

	@action setDefaultValue = name => {
		// this.categoryDefaultValue = this.ManufactureProcessList[2];
		this.ManufactureProcessList.forEach(t => {
			console.log(t);
			if (t.name == name) {
				this.categoryDefaultValue.big = t;
				this.categoryDefaultValue.mid = t.detail[0];
				this.selectedBigCategory = t;
				this.selectedMidCategory = t.detail[0];
				console.log(this.categoryDefaultValue.mid);
				this.midCategorySet = t.detail;
			}
		});
	};

	@action saveSelect = req => {
		ManufactureProcessAPI.saveSelect(req)
			.then(res => {
				console.log('받은 리스폰스', res);
				this.EstimateDataForDrawing = res.data.data;
				console.log(this.EstimateDataForDrawing);

				this.moldPrice = Math.round(this.EstimateDataForDrawing.totalMinPrice / 10000);
				this.ejaculationPrice = Math.round(this.EstimateDataForDrawing.MinPrice / 10) * 10;

				this.MaxPrice = this.EstimateDataForDrawing.maxPrice;
				this.MinPrice = this.EstimateDataForDrawing.minPrice;
				this.totalMaxPrice = this.EstimateDataForDrawing.totalMaxPrice;
				this.totalMinPrice = this.EstimateDataForDrawing.totalMinPrice;
				this.proposal_type = res.data.proposalId;
				this.message = res.data.message;
				Proposal.loadEstimateInfo(this.proposal_type);
				// console.log("EStimate = proposal_type="+this.proposal_type);
				return res;
			})
			.catch(e => {
				console.log(e);
				console.log(e.response);
			});
	};
}
export default new ManufactureProcess();
