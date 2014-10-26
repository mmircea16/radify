(ns radify.routes.radar
  (:require [radify.controllers.radar :as controller]
            [compojure.core :refer [GET POST defroutes context]]
            [compojure.route :as route]))


(defroutes app-routes
    (GET "/" [] (controller/main-page))
    (route/resources "/")

    (GET "/api" [] (controller/api-welcome))
    (GET "/api/radar/:id" [id] (controller/get-radar id))
    (POST "/api/radar" {body :body} (controller/save-radar body))

    (route/not-found "<h1>Page not found</h1>"))
