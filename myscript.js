// ** BOOLFLIX ** In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti chepermettono la visione di film e telefilm.Per fare questo, come fanno siti molto più rinomati, utilizzeremo un API che cipermette di avere un insieme di risultati congrui alla nostra ricerca

// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:

// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto

function  searchMovies() {

  var inputTarget = $('#search');
  var button = $('#btn');

  button.click(getMovies);
  inputTarget.keyup(function() {

    if ( event.which == 13 ) {

      getMovies();

    }

  });

};


function getMovies() {

  var inputTarget = $('#search');

  var template = $('#movie_template').html();
  var compiled = Handlebars.compile(template);
  var moviesTarget = $('#movies');

  moviesTarget.html('');

  $.ajax({

    url:'https://api.themoviedb.org/3/search/movie?api_key=f8286655b8fe2d5049fce0ac4760805f&language=it-IT',
    method: 'GET',
    data: {

      'query': inputTarget.val()
    },

    success: function(data) {

      var success = data['success'];
      var moviesResults = data['results'];

      for (var i = 0; i < moviesResults.length; i++) {

        var movies = moviesResults[i];
        var movieTitle = movies['title'];
        var movieOriginalTitle = movies['original_title'];
        var movieLanguage = movies['original_language'];
        var movieRate = movies['vote_average'];

        var moviesHtml = compiled({

          'title': movieTitle,
          'originalTitle': movieOriginalTitle,
          'language': movieLanguage,
          'rate': movieRate

        })

        inputTarget.val('');
        moviesTarget.append(moviesHtml);

      }

    },
    error: function(err) {

      console.log('err', err);

    }

  });

};

// Milestone 2: Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così dapermetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,lasciando le restanti vuote (troviamo le icone in FontAwesome).Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezzepiene. Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera dellanazione corrispondente, gestendo il caso in cui non abbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono in FontAwesome). Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricercadovremo prendere sia i film che corrispondono alla query, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici).



// **__**__ ELENCO FUNZIONI __**__**

function init() {

  searchMovies();

};


$(document).ready(init);
