(ns radify.core
  (:require [radify.models.radar :as radar]
            [compojure.core :refer [GET defroutes]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [org.httpkit.server :as server]
            [ring.util.response :as ring-response]
            [ring.middleware.json :as ring-middleware])
    (:gen-class))

(defn get-radar [_]
  radar/dummy-radar)

(defroutes app-routes
  (GET "/" [] "<h1>Hello World! This is radify!</h1>")
  (GET "/radar/:id" [id] (ring-response/response (get-radar id)))
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (-> (handler/api app-routes)
      (ring-middleware/wrap-json-response)))

(defn -main []
  (server/run-server app {:port 8080}))
