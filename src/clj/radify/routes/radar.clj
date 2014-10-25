(ns radify.routes.radar
  (:require [radify.models.radar :as radar]
            [compojure.core :refer [GET defroutes]]
            [compojure.route :as route]
            [ring.util.response :as ring-response]))


(defn get-radar [_]
  radar/dummy-radar)

(defroutes app-routes
  (GET "/" [] "<h1>Hello World! This is radify!</h1>")
  (GET "/radar/:id" [id] (ring-response/response (get-radar id)))
  (route/not-found "<h1>Page not found</h1>"))
