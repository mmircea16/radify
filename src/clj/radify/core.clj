(ns radify.core
  (:require [radify.routes.radar :as routes]
            [compojure.handler :as handler]
            [org.httpkit.server :as server]
            [ring.middleware.json :as ring-middleware])
    (:gen-class))


(def app
  (-> (handler/site routes/app-routes)
      (ring-middleware/wrap-json-body)
      (ring-middleware/wrap-json-response)))

(defn -main []
  (server/run-server app {:port 8080}))
