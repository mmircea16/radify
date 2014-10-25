(ns radify.db.couchdb
  (:require [com.ashafa.clutch :as clutch]))


(def db
  (clutch/couch "radify"))

(def conn
  (clutch/create! db))

(defn load-item [id]
  (let [item (get-in conn [(str id)])]
  item))

(defn save-item [data]
  (clutch/put-document conn data))
