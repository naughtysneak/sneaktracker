class QueueCard
{
	id;
	description;
	cardBody;

	constructor(information)
	{
		this.cardBody = document.createElement("div");
		this.PopulateInformation(information);
	}

	PopulateInformation(information)
	{
		this.cardBody.classList.add("queue-card");
		if(information.isReservation)
			this.cardBody.classList.add("card-reservation");
		this.cardBody.innerHTML = `
			<h3 class="card-id">${information.isReservation ? "RSV-" : "NS-"}${information.id}</h3>
			<div class="card-body">
				<h4 class="card-order">${information.order}</h4>
				<hr>
				<p class="card-description">${information.description}</p>
			</div>
		`;

		if(information.isReservation)
			reservationQueue.appendChild(this.cardBody);
		else
			orderQueue.appendChild(this.cardBody);
	}

	Destroy()
	{
		if (this.cardBody && this.cardBody.parentNode)
			this.cardBody.parentNode.removeChild(this.cardBody);
	}
}

let orderQueue = document.getElementById("orderQueue");
let reservationQueue = document.getElementById("reservationQueue");
let financialProgressText = document.getElementById("financialProgressText");
let progressBar = document.getElementById("progressBar");
let queue = [];
let allQueueCards = [];

async function FetchData()
{
	var URL = "./queue.json?v=" + new Date().getTime();
	var response = await fetch(URL).then(res => res.json());
	
	queue = response.commissionQueue;

	let progress = (response.financialProgress[0].currentAmount / response.financialProgress[0].targetAmount) * 100;
	financialProgressText.textContent = `Financial Progress: $${response.financialProgress[0].currentAmount} / $${response.financialProgress[0].targetAmount}`;
	progressBar.style.setProperty("--progress-fill", `${progress}%`);

	UpdateQueueList(queue, allQueueCards);
}

function UpdateQueueList(queue, allCards)
{
	if(allCards.length != queue.length)
	{
		allCards.forEach(element => {
			element.Destroy();
		});
		allCards.length = 0;

		queue.forEach(element => {
			allCards.push(new QueueCard(element));
		});
	}
	else
	{
		for(let i = 0; i < queue.length; i++)
			allCards[i].PopulateInformation(queue[i]);
	}
}