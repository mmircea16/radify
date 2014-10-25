(ns radify.routes.radar
  (:require [radify.models.radar :as radar]
            [radify.db.couchdb :as db]
            [compojure.core :refer [GET POST defroutes context]]
            [compojure.route :as route]
            [ring.util.response :as ring]))

(defn- response-wrapper [status data]
  (ring/status (ring/response data) status))

(def ^:private error-saving
  (response-wrapper 400 {:message "Oops, something bad ocurred while trying to save"}))

(defn get-radar [id]
  (if (= id "dummy")
    radar/dummy-radar
    (db/load-item id)))

(defn save-radar [radar]
  (let [result (db/save-item radar)]
      (if (nil? result)
          error-saving
          (ring/response result))))

(defroutes app-routes
    (GET "/" [] (ring/resource-response "index.html" {:root "public/html"}))
    (route/resources "/")

    (GET "/api" [] "<h1>Hello World! This is radify API!</h1>")
    (GET "/api/radar/:id" [id] (ring/response (get-radar id)))
    (POST "/api/radar" {body :body} (save-radar body))

    (route/not-found "<h1>Page not found</h1>"))
