var sequences = ["The current minors of Fontys are broad enough and changes are not needed", 
"ICT-related studies should have gymnastics included in the course", 
"Partners in Education should be more involved in projects of students",
"Further automation and robotisation will improve the lives of ordinary Dutch people",
"The government must realize a database with DNA profiles of all citizens",
"Technology companies must get tax benefits for attracting women"]

module.exports.getRandomSequence =  function (){
    return sequences[(Math.floor(Math.random() * sequences.length))];
}