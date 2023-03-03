let newArray = [];
let defaultData = []
// ai tools data load 
const aiToolsDataLoad = async (dataShowValue) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.status) {
            //console.log('sorry data no found')
        }
        dataLoadingSpinner(true)
        displayAiTools(data.data?.tools, dataShowValue);



    } catch (error) {
        error.message
    }
}
aiToolsDataLoad(6)










// display ai tools data 
const displayAiTools = (datas) => {
    try {

        
        let dataSlice;
        if (datas.length > 6) {
            dataSlice = datas.slice(0, 6);
        }
        else {
            dataSlice = datas;
        }
        newArray = datas;

        displayCardShow(dataSlice)

        //console.log(dataSlice);

    } catch (error) {
        //console.log(error.message)
    }

}

// show data in display 

const displayCardShow = (datas) => {
    //console.log(datas);
    const aiCardContainer = document.getElementById('aiCardContainer');
    aiCardContainer.textContent = '';
    datas.forEach(data => {
        const { image, features, name, published_in, id } = data;
        const div = document.createElement('div')
        div.classList.add('card', 'px-6', 'pt-8', 'bg-base-100', 'border', 'transition', 'ease-in-out', 'delay-150', 'hover:shadow-xl')
        // //console.log(data);
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
    dataLoadingSpinner(false)

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
        displaySingleData(data?.data);

    } catch (error) {
        //console.log(error.message);
    }
}



// display single ai data 
const displaySingleData = (singleData) => {
    //console.log(singleData);
    console.log(singleData);
    const { accuracy, description, features, integrations, pricing, image_link, input_output_examples } = singleData;
    const { score } = accuracy;
    const [basic, pro, diamond] = pricing;

    document.getElementById('descriptionAi').innerText = description;
    document.getElementById('featuresAi').innerHTML = `${singleDataFeatureList(features)}`;
    document.getElementById('IntegrationsAi').innerHTML = `${integrations ? FeaturesList(integrations) : 'No data Found'}`;
    document.getElementById('singleAiImg').setAttribute('src', `${image_link[0]}`)
    document.getElementById('accuracyBadge').innerHTML = `${score ? `<div class="badge badge-error px-5 py-5 rounded-xl text-lg font-semibold text-white ">
    ${score * 100}% accuracy
</div>`: ''} `
    document.getElementById('aiQuestion').innerText = `${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}`
    document.getElementById('aiAnswer').innerText = `${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}`
    document.getElementById('basicPlan').innerHTML = `${pricing ? 'dfdfdf' : 'No data Found'}`
    //console.log(pricing);


}

// show more data load btn 
const dataLoadMore = () => {
    const loadMore = document.getElementById('loadMore');
    const loadMorClassName = loadMore.className;
    dataLoadingSpinner(true);
    displayCardShow(newArray);
    // if (loadMorClassName.includes('loadMore')) {
    //     displayCardShow(newArray);
    //     loadMore.innerText = 'Less More';
    //     loadMore.classList.remove('loadMore');
    // }
    // else {
    //     displayCardShow(newArray);
    //     loadMore.innerText = 'Show More';
    //     loadMore.classList.add('loadMore');

    // }
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



// sorting 
document.getElementById('sortingBtn').addEventListener('click', () => {
    newArray.sort((a, b) => {
        const aiDateOne = new Date(a.published_in)
        const aiDateOneTime = aiDateOne.getTime();
        const aiDateTwo = new Date(b.published_in)
        const aiDateTwoTime = aiDateTwo.getTime();
        return aiDateOneTime - aiDateTwoTime;
    })
    dataLoadingSpinner(true)

    displayAiTools(newArray)
    //console.log(newArray);

})

// sorting with date 