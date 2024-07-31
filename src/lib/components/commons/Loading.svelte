<div class="flex justify-center">
	<div class="container">
		<div class="bars">
			<span class="bars__bar bars__bar--0"></span><span class="bars__bar bars__bar--1"></span><span
				class="bars__bar bars__bar--2"
			></span><span class="bars__bar bars__bar--3"></span><span class="bars__bar bars__bar--4"
			></span><span class="bars__bar bars__bar--5"></span><span
				class="bars__bar bars__bar--alt bars__bar--0--alt"
			></span><span class="bars__bar bars__bar--alt bars__bar--1--alt"></span><span
				class="bars__bar bars__bar--alt bars__bar--2--alt"
			></span><span class="bars__bar bars__bar--alt bars__bar--3--alt"></span><span
				class="bars__bar bars__bar--alt bars__bar--4--alt"
			></span><span class="bars__bar bars__bar--alt bars__bar--5--alt"></span>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 80px;
	}
	.container > div {
		margin: 20px 50px;
	}

	.bars {
		position: relative;
		height: 100px;
		width: 170px;
	}
	.bars__bar {
		position: absolute;
		top: 40%;
		bottom: 40%;
		width: 7%;
		background-color: #fefefe;
		-webkit-animation: bars 1.5s infinite ease-out;
		animation: bars 1.5s infinite ease-out;
	}
	.bars__bar--alt {
		background-color: rgba(254, 254, 254, 0.4);
	}
	.bars__bar--0 {
		left: 0%;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}
	.bars__bar--0--alt {
		left: 0%;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}
	.bars__bar--1 {
		left: 18.6%;
		-webkit-animation-delay: 0.1s;
		animation-delay: 0.1s;
	}
	.bars__bar--1--alt {
		left: 18.6%;
		-webkit-animation-delay: 0.6s;
		animation-delay: 0.6s;
	}
	.bars__bar--2 {
		left: 37.2%;
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}
	.bars__bar--2--alt {
		left: 37.2%;
		-webkit-animation-delay: 0.7s;
		animation-delay: 0.7s;
	}
	.bars__bar--3 {
		left: 55.8%;
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}
	.bars__bar--3--alt {
		left: 55.8%;
		-webkit-animation-delay: 0.8s;
		animation-delay: 0.8s;
	}
	.bars__bar--4 {
		left: 74.4%;
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	}
	.bars__bar--4--alt {
		left: 74.4%;
		-webkit-animation-delay: 0.9s;
		animation-delay: 0.9s;
	}
	.bars__bar--5 {
		left: 93%;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}
	.bars__bar--5--alt {
		left: 93%;
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}

	@-webkit-keyframes bars {
		0%,
		60% {
			top: 40%;
			bottom: 40%;
		}
		20% {
			top: 0;
			bottom: 40%;
		}
		40% {
			top: 40%;
			bottom: 0;
		}
	}

	@keyframes bars {
		0%,
		60% {
			top: 40%;
			bottom: 40%;
		}
		20% {
			top: 0;
			bottom: 40%;
		}
		40% {
			top: 40%;
			bottom: 0;
		}
	}
</style>
