

$(document).ready(function() {
	// 등록
	Vue.component('my-footer', {
	  template: `<div class="footer">
		    <div class="contact">
		        <h6>CS CENTER</h6>
		        <p id="tel">公众号 ID : HaoDoc</p>
		        <p id="worktime">AM 09:00 - PM 06:00</p>
		        <p id="lunchtime">LUNCH 11:30 - 12:30</p>
		        <h6 id="email">E-mail: haodoc@haodoc.co.kr</h6>
		    </div>
		    <div class="company-info">
		        <h5>INSPIRE&nbsp;&nbsp;|&nbsp;&nbsp;HaoDoc</h5>
		        <h5>대표 김승범&nbsp;&nbsp;|&nbsp;&nbsp;사업자 등록 번호 631-05-01190</h5>
		        <h6>02841 서울시 성북구 안암로 145 경영본관 2층 일진창업센터 220호</h6>
		    </div>
		    <div class="terms">
		        <p><a href="/rules">이용약관</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/personal">개인정보취급방침</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/rules">이용안내</a></p>
		    </div>
		    <div class="copyright">
		        <p>COPYRIGHT © 2018 INSPIRE All rights reserved</p>
		    </div>
		</div>`
	});


	// 등록
	Vue.component('modal', {
	  template: `<transition name="modal">
				    <div class="modal-mask">
				      <div class="modal-wrapper">
				        <div class="modal-container">

				          <div class="modal-header">
				            <slot name="header">
				              default header
				            </slot>
				          </div>

				          <div class="modal-body">
				            <slot name="body">
				              default body
				            </slot>
				          </div>

				          <div class="modal-footer">
				            <slot name="footer">
				              default footer
				              <button class="modal-default-button" @click="$emit('close')">
				                OK
				              </button>
				            </slot>
				          </div>
				        </div>
				      </div>
				    </div>
				  </transition>`
	});


	Vue.filter('moment', function (date) {
        return moment(date).format('MM/DD hh:mm a');
    })


	$('#top-btn').on('click', function(){
		window.scrollTo(0, 0);
	})



});