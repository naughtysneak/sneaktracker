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
		this.cardBody.innerHTML = `
			<h2 class="card-id">ID: ${information.id}</h2>
			<div class="card-body">
				<h3 class="card-order">Order - ${information.order}</h3>
				<hr>
				<p class="card-description">${information.description}</p>
			</div>
		`;
		orderQueue.appendChild(this.cardBody);
	}

	Destroy()
	{
		if (this.cardBody && this.cardBody.parentNode)
			this.cardBody.parentNode.removeChild(this.cardBody);
	}
}

let orderQueue = document.getElementById("orderQueue");
let queue = [];
let allQueueCards = [];

async function FetchData()
{
	var URL = "./queue.json?v=" + new Date().getTime();
	var response = await fetch(URL).then(res => res.json());
	
	queue = response.commissionQueue;
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