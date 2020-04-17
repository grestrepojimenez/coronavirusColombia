
          fetch(
            "https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=5000",
            {
              method: "GET",
            })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
            showData(myJson);
             })
            .catch((err) => {
              console.log(err);
            });

