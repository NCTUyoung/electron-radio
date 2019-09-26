const LauFm = require('lautfm')

const laut = new LauFm()
const $ = require('jquery')
let player = $('audio').get(0)
laut.getStations({
    by:'letter',
    term:'e'
}).then((stations)=>{
    if(stations){
        stations.forEach(station=>{
            console.log(station)
            let singleStation = `
            <li class="list-group-item" onclick="playStream('${station.stream_url}',this)">
                <img class="img-circle media-object pull-left" src="${station.images.station_80x80}" width="32" height="32">
                <div class="media-body">
                    <strong>${station.display_name}</strong>
                    <p>${station.description}</p>
                </div>
            </li>
            `
            $('#station-list').append(singleStation)
        })
    }
    console.log(stations)
}).catch((e)=>{
    console.log(e)
})

function playStream(url,li) {
    let allStation = $('.list-group-item')
    allStation.removeClass('active')
    player.src = url
    player.load()
    player.play()
    $(li).addClass('active')
}