
$(".menubar").click(function()
{
    $(".nav").animate({left:"0"},"500",function()
    {
        $(".hide").show()
        $(".menubar").hide()
    })
    $(".category .item1").animate({opacity:"1" , top:"20px"},600 , function(){
        $(".category .item2").animate({opacity:"1" , top:"60px"},500, function(){
            $(".category .item3").animate({opacity:"1" , top:"100px"},400,function(){
                $(".category .item4").animate({opacity:"1" , top:"140px"},300,function(){
                    $(".category .item5").animate({opacity:"1" , top:"180px"},200,function(){
                        $(".category .item6").animate({opacity:"1" , top:"220px"},100)
                    })
                })
            })
        })
    })
})

$(".hide").click(function()
{
    let navPosition = $(".nav").innerWidth()

    $(".nav").animate({left:- navPosition},"500",function()
    {
        $(".hide").hide()
        $(".menubar").show()
    })
    $(".category .item1 , .item2 , .item3 , .item4 , .item5 , .item6").animate({opacity:"0" , top:"50%"})
})

// <!=========================================== Display ApI ==========================================================!>
let ImgPath = `https://image.tmdb.org/t/p/w500/`;
let catHref =``;
let http;
async function movies(defult = `now_playing`)
{
    http = await fetch(`https://api.themoviedb.org/3/movie/${defult}?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US&page=1`)
    http = await http.json()
    let collector = ``;

    for (let i = 0 ; i < http.results.length ; i++)
    {
        let posterPath = http.results[i].poster_path
        collector +=
        `
                    <div class=" col-lg-4 col-md-6 pb-4">
                        <div class="img-box position-relative">
                            <img src="`+ImgPath+posterPath+`" class="img-fluid rounded position-relative ">
                            <div class="box">
                                <div class="box-contnet">
                                    <h4>`+http.results[i].original_title+`</h4>
                                    <p>`+http.results[i].overview+`</p>
                                    <p>`+"rate:"+http.results[i].vote_average+`</p>
                                    <p>`+http.results[i].release_date+`</p>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        $("#Display").html(collector)
    }
}
$(".category ul li a").click(function () 
{
    catHref = $(this).attr("value");
    if(catHref !="trending" )
    {
        movies(catHref);
    }
    else
    {
        TrendingMovies()
    }
    
});
movies()
// <!=========================================== Display Trending ==========================================================!>
async function TrendingMovies()
{
    http = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=13e3cda7786b7e0b9e825c933ba87591`)
    http = await http.json()
    let collector = ``;
    for (let i = 0 ; i < http.results.length ; i++)
    {
        let posterPath = http.results[i].poster_path
        collector +=
        `
                    <div class=" col-lg-4 col-md-6 pb-4">
                        <div class="img-box position-relative">
                            <img src="`+ImgPath+posterPath+`" class="img-fluid rounded position-relative ">
                            <div class="box">
                                <div class="box-contnet">
                                    <h4>`+http.results[i].original_title+`</h4>
                                    <p>`+http.results[i].overview+`</p>
                                    <p>`+"rate:"+http.results[i].vote_average+`</p>
                                    <p>`+http.results[i].release_date+`</p>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        $("#Display").html(collector)
    }
}
// <!=========================================== Display search ==========================================================!>
async function SearchByWord(searchWord)
    {
        http = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=13e3cda7786b7e0b9e825c933ba87591&language=en-US&query=${searchWord}&page=1&include_adult=false`)
        http = await http.json()
        let collector = ``;
        for (let i = 0 ; i < http.results.length ; i++)
        {
            let posterPath = http.results[i].poster_path
            
            collector +=
            `
                        <div class=" col-lg-4 col-md-6 pb-4">
                            <div class="img-box position-relative">
                                <img src="`+ImgPath+posterPath+`" class="img-fluid rounded position-relative ">
                                <div class="box">
                                    <div class="box-contnet">
                                        <h4>`+http.results[i].original_title+`</h4>
                                        <p>`+http.results[i].overview+`</p>
                                        <p>`+"rate:"+http.results[i].vote_average+`</p>
                                        <p>`+http.results[i].release_date+`</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
        }
        $("#Display").html(collector)
}
$("#searchApi").keyup(function()
{
    $("#DisplaySearch").html("")
    let word = $(this).val()
    SearchByWord(word)
})
// <!===================================================== search in page ========================================================>
$("#search").keyup(function()
{
    let collector = ``;
    for(let i = 0 ; i < http.results.length; i++)
    {
        let SearchMovie = http.results[i].original_title;
        let posterPath = http.results[i].poster_path

        if (SearchMovie.toLowerCase().includes($(this).val()))
        {
            collector +=
            `
                        <div class=" col-lg-4 col-md-6 pb-4">
                            <div class="img-box position-relative">
                                <img src="`+ImgPath+posterPath+`" class="img-fluid rounded position-relative ">
                                <div class="box">
                                    <div class="box-contnet d-flex flex-column ">
                                        <h4>`+http.results[i].original_title+`</h4>
                                        <p>`+http.results[i].overview+`</p>
                                        <p>`+"rate:"+http.results[i].vote_average+`</p>
                                        <p>`+http.results[i].release_date+`</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
        }
        $("#DisplaySearch").html(collector)
    }

    $(".category ul li a").click(function () 
    {
        catHref = $(this).attr("value");
        if(catHref == "" )
        {
            $("#DisplaySearch").html("")
        }
        else
        {
            $("#DisplaySearch").html("")
        }
        
    });
})

// <!=========================================== validation ============================================>

const regXEmail = /^[a-zA-Z0-9]+(@)[a-z]+(\.)[a-z]{2,3}$/
const regXName = /^[a-zA-z]{3,}$/
const regXPassword = /^.{8,}$/
const regXrePassowrd = /^.{8,}$/
const regXPhone = /^(01)[1250][0-9]{8}$/
const regxAge = /^[1-9][0-9]$/

let nameStatus = false
let emailStatus = false
let passStatus = false
let repassStatus = false
let phoneStatus = false
let ageStatus = false

    $("#ContactUs #name").keyup(function()
    {
        if(regXName.test($(this).val()))
        {
            nameStatus = true
            $("#ContactUs #name-alert").addClass("d-none")
            $(this).addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            nameStatus = false
            $("#ContactUs #name-alert").removeClass("d-none")
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })

    $("#ContactUs #email").keyup(function()
    {
        emailStatus = true
        if(regXEmail.test($(this).val()))
        {
            $("#ContactUs #email-alert").addClass("d-none")
            $(this).addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            emailStatus = false
            $("#ContactUs #email-alert").removeClass("d-none")
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })

    $("#ContactUs #phone").keyup(function()
    {
        phoneStatus = true
        if(regXPhone.test($(this).val()))
        {
            $("#ContactUs #phone-alert").addClass("d-none")
            $(this).addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            phoneStatus = false
            $("#ContactUs #phone-alert").removeClass("d-none")
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })

    $("#ContactUs #age").keyup(function()
    {
        ageStatus = true
        if(regxAge.test($(this).val()))
        {
            $("#ContactUs #age-alert").addClass("d-none")
            $(this).addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            ageStatus = false
            $("#ContactUs #age-alert").removeClass("d-none")
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })

    $("#ContactUs #pass").keyup(function()
    {
        passStatus = true
        if(regXPassword.test($(this).val()))
        {
            $("#ContactUs #pass-alert").addClass("d-none")
            $(this).addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            passStatus = false
            $("#ContactUs #pass-alert").removeClass("d-none")
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })
    $("#ContactUs #repass").keyup(function()
    {
        let pass = $("#ContactUs #pass").val()
        if(pass == $(this).val())
        {
            repassStatus = true
            $("#repass").addClass(" is-valid")
            $(this).removeClass("is-invalid")
            validation()
        }
        else
        {
            repassStatus = false
            $(this).removeClass("is-valid")
            $(this).addClass("is-invalid")
            validation()
        }
    })

function validation()
{
    if(nameStatus && emailStatus && ageStatus && passStatus && phoneStatus && repassStatus)
    {
        $(".btn-outline-danger").attr("disabled",false)
    }
    else
    {
        $(".btn-outline-danger").attr("disabled",true)
    }
}