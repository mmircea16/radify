(ns radify.routes.radar
  (:require [radify.models.radar :as radar]
            [radify.db.couchdb :as db]
            [compojure.core :refer [GET defroutes context]]
            [compojure.route :as route]
            [ring.util.response :as ring]))


(defn get-radar [id]
  (if (= id "dummy")
    radar/dummy-radar
    (db/load-item id)))

(defroutes app-routes
    (GET "/" [] (ring/resource-response "index.html" {:root "public/html"}))
    (route/resources "/")

    (GET "/api" [] "<h1>Hello World! This is radify API!</h1>")
    (GET "/api/radar/:id" [id] (ring/response (get-radar id)))

    (route/not-found "<h1>Page not found</h1>"))
