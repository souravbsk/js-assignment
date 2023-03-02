// ai tools data load 
const aiToolsDataLoad = async (dataShowValue) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.status) {
            console.log('sorry data no found')
        }
        dataLoadingSpinner(true)
        displayAiTools(data.data?.tools,dataShowValue);



    } catch (error) {

    }
}
aiToolsDataLoad(6)



const FeaturesList = (listData) => {
    let listItems = '';

    for (const list of listData) {
        listItems += '<li>' + list + '</li>';


    }
    return listItems;

}

// display ai tools data 
const displayAiTools = (datas,dataShowValue) => {
    const aiCardContainer = document.getElementById('aiCardContainer');
    aiCardContainer.textContent = '';

    let dataSlice;
    if(dataShowValue === 6){
         dataSlice = datas.slice(0,6);
    }
    else{
        dataSlice = datas;
    }
    console.log(dataSlice);
    
    dataSlice.forEach(data => {
        const { image, features, name, published_in } = data;
        const div = document.createElement('div')
        div.classList.add('card', 'px-6', 'pt-8', 'bg-base-100', 'border', 'transition', 'ease-in-out', 'delay-150', 'hover:shadow-xl')
        // console.log(data);
        div.innerHTML = `
        <figure>
                        <img src=${image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body justify-between px-0">
                        <div class="space-y-3 pb-5">
                            <h2 class="card-title text-2xl font-bold">Features</h2>
                            <ul class="list-decimal list-inside text-base space-y-1">
                             ${features ? FeaturesList(features) : 'not available'}
                            </ul>
                        </div>
                        <div class="pt-2 flex justify-between border-t-2 items-center">
                            <div class="space-y-3">
                                <h2 class="card-title text-2xl font-bold">${name ? name : "not available"}</h2>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg"><i class="fa-solid fa-calendar-week"></i></span>
                                    <span class="text-lg">${published_in ? published_in : 'not available'}</span>
                                </div>
                            </div>
                            <div>
                                <a
                                    class="text-xl px-3 py-2 transition ease-in-out hover:bg-[#EB5757] delay-100 rounded-full hover:text-white text-[#EB5757]"><i
                                        class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
        
        `
        aiCardContainer.appendChild(div)
    });
    dataLoadingSpinner(false)

}



// show more data load btn 
const dataLoadMore = () => {
    const loadMore = document.getElementById('loadMore');
    const loadMorClassName = loadMore.className;
    dataLoadingSpinner(true)
    if(loadMorClassName.includes('loadMore')){
        aiToolsDataLoad(8);
        loadMore.innerText = 'Less More';
        loadMore.classList.remove('loadMore');
    }
    else{
        aiToolsDataLoad(6);
        loadMore.innerText = 'Show More';
        loadMore.classList.add('loadMore');

    }
}


// spinner loader 
const dataLoadingSpinner = (isSpinner) => {
    const spinner = document.getElementById('spinner');
    if (isSpinner) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')

    }
}



