let newArray = [];
// ai tools data load 
const aiToolsDataLoad = async (dataShowValue) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.status) {
            console.log('sorry data no found')
            return
        }
        dataLoadingSpinner(true)
        displayAiTools(data.data?.tools, dataShowValue);
    } catch (error) {
        console.log(error);
    }
}
// display ai tools data 
const displayAiTools = (datas, dataShowValue) => {
    try {
        const aiCardContainer = document.getElementById('aiCardContainer');
        aiCardContainer.textContent = '';

        let dataSlice;
        if (dataShowValue === 6) {
            dataSlice = datas.slice(0, 6);
        }
        else {
            dataSlice = datas;
        }

        dataSlice.forEach(data => {
            const { image, features, name, published_in, id } = data;
            const div = document.createElement('div')
            div.classList.add('card', 'px-6', 'pt-8', 'bg-base-100', 'border', 'transition', 'ease-in-out', 'delay-150', 'hover:shadow-xl')
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
                            <button onclick="singleAiData('${id}')"> <label  for="my-modal-5" 
                                    class="text-2xl cursor-pointer px-5 py-4 transition ease-in-out hover:bg-[#EB5757] delay-100 rounded-full hover:text-white text-[#EB5757]"><i
                                    class="fa-solid fa-arrow-right"></i></label>
                                    </button>
                                    </div>
                                    </div>
                                    </div>
                                    
                                    `
            aiCardContainer.appendChild(div)
        });

        newArray = dataSlice;
        dataLoadingSpinner(false)


    } catch (error) {
        console.log(error)
    }

}
// listConvert 
const FeaturesList = (listData) => {
    let listItems = '';

    for (const list of listData) {
        listItems += '<li>' + list + '</li>';
    }
    return listItems;

}


// singleDataFeatureList
const singleDataFeatureList = (listData) => {
    let listItems = '';

    for (const list in listData) {
        const { feature_name } = listData[list];
        listItems += '<li>' + feature_name + '</li>';
    }
    return listItems;

}


// singleAiToolData 
const singleAiData = async (dataId) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${dataId}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.status) {
            alert('data not found');
            return
        }
        // console.log(data);
        displaySingleData(data?.data);

    } catch (error) {
        console.log(error);
    }
}



// display single ai data 
const displaySingleData = (singleData) => {
    try {

        const { accuracy, description, features, integrations, pricing, image_link, input_output_examples } = singleData;
        const { score } = accuracy;
                document.getElementById('descriptionAi').innerText = `${description ? description : 'content not available'}`;
                document.getElementById('featuresAi').innerHTML = `${features ? singleDataFeatureList(features) : 'No data Found'}`;
                document.getElementById('IntegrationsAi').innerHTML = `${integrations ? FeaturesList(integrations) : 'No data Found'}`;
                document.getElementById('singleAiImg').setAttribute('src', `${image_link[0]}`)
                document.getElementById('accuracyBadge').innerHTML = `${score ? `<div class="badge badge-error px-5 py-5 rounded-xl md:text-lg font-semibold text-white ">
            ${score * 100}% accuracy
        </div>`: ''} `;
                document.getElementById('aiQuestion').innerText = `${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}`;
                document.getElementById('aiAnswer').innerText = `${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}`;
                document.getElementById('basicPlan').innerHTML = `${pricing ? pricing[0].price + '<br>' + pricing[0].plan : 'No data Found'}`;
                document.getElementById('proPlan').innerHTML = `${pricing ? pricing[1].price + '<br>' + pricing[1].plan : 'No data Found'}`;
                document.getElementById('diamond').innerHTML = `${pricing ? pricing[2].price + '<br>' + pricing[2].plan : 'No data Found'}`;

    } catch (error) {
        console.log(error);
    }
}



// default data show 
aiToolsDataLoad(6)



// show more data load btn 
const dataLoadMore = () => {
    const loadMore = document.getElementById('loadMore');
    const loadMorClassName = loadMore.className;
    dataLoadingSpinner(true)
    if (loadMorClassName.includes('loadMore')) {
        aiToolsDataLoad(8);
        loadMore.innerText = 'Less More';
        loadMore.classList.remove('loadMore');
    }
    else {
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


// sorting with date 
const sortingData = () => {
    newArray.sort((a, b) => {
        return new Date(a.published_in) - new Date(b.published_in)
    })
    dataLoadingSpinner(true)
    displayAiTools(newArray)
}
