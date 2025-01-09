function storyCard(selectedStory) {
	const configCard1 = {
		parentTag: selectedStory.parentTag,
		content: `<figure style='height: 9rem;overflow: hidden;margin: 0;'>
			 	<img style='width: 100%; height: 10rem; overflow: hidden; object-fit: cover;' src='img/storyboard/shoes.jpg' alt='Shoes' />
			 </figure>
			 <div style='display: flex; flex-direction: column; padding: 1rem; gap: 0.5rem;'>
			 <div style='color: black;'>Buy new shoes</div>
			 <div style='color: gray;'>Only $100</div>`,
	};

	ui.card(configCard1);

	const configCard2 = {
		parentTag: selectedStory.parentTag,
		onComplete: (context) => {
			context.Card.getBodyTag().innerHTML = `<p style='padding:3rem;'>Your Card content will go here</p>
				 <div style='display: flex; justify-content: flex-end; padding: 1rem;'>
				 <mambo-button id='btnSelect'></mambo-button>`;

			const button = document.getElementById("btnSelect");
			button.setup({
				text: "Seleccionar",
				type: "primary",
				size: "small",
				onClick: () => {
					console.log("Button clicked");
				},
			});
		},
	};

	ui.card(configCard2);
}
