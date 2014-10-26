(ns radify.routes.radar
  (:require [radify.controllers.radar :as controller]
            [compojure.core :refer [GET POST defroutes context]]
            [cemerick.friend-demo.misc :as misc]
            [cemerick.friend :as friend]
            [cemerick.friend.openid :as openid]
            (compojure [handler :as handler])
            [ring.util.response :as resp]
            [hiccup.page :as h]
            [compojure.route :as route]))


(defroutes app-routes
    (GET "/" [] (controller/main-page))
    (route/resources "/")

    (GET "/api" [] (controller/api-welcome))
    (GET "/api/radar/:id" [id] (controller/get-radar id))
    (POST "/api/radar" {body :body} (controller/save-radar body))


(def providers [{:name "Google" :url "https://www.google.com/accounts/o8/id"}
                {:name "Yahoo" :url "http://me.yahoo.com/"}
                {:name "AOL" :url "http://openid.aol.com/"}
                {:name "Wordpress.com" :url "http://username.wordpress.com"}
                {:name "MyOpenID" :url "http://username.myopenid.com/"}])


    (GET "/api/login" req
    (h/html5
      misc/pretty-head
      (misc/pretty-body
        (misc/github-link req)
        [:h2 "Authenticating with various services using OpenID"]
        [:h3 "Current Status " [:small "(this will change when you log in/out)"]]
        (if-let [auth (friend/current-authentication req)]
          [:p "Some information delivered by your OpenID provider:"
           [:ul (for [[k v] auth
                      :let [[k v] (if (= :identity k)
                                    ["Your OpenID identity" (str (subs v 0 (* (count v) 2/3)) "…")]
                                    [k v])]]
                  [:li [:strong (str (name k) ": ")] v])]]
          [:div
           [:h3 "Login with…"]
           (for [{:keys [name url]} providers
                 :let [base-login-url (misc/context-uri req (str "/login?identifier=" url))
                       dom-id (str (gensym))]]
             [:form {:method "POST" :action (misc/context-uri req "login")
                     :onsubmit (when (.contains ^String url "username")
                                 (format "var input = document.getElementById(%s); input.value = input.value.replace('username', prompt('What is your %s username?')); return true;"
                                   (str \' dom-id \') name))}
               [:input {:type "hidden" :name "identifier" :value url :id dom-id}]
               [:input {:type "submit" :class "button" :value name}]])
           [:p "…or, with a user-provided OpenID URL:"]
           [:form {:method "POST" :action (misc/context-uri req "login")}
            [:input {:type "text" :name "identifier" :style "width:250px;"}]
            [:input {:type "submit" :class "button" :value "Login"}]]])
        [:h3 "Logging out"]
        [:p [:a {:href (misc/context-uri req "logout")} "Click here to log out"] "."])))

    (route/not-found "<h1>Page not found</h1>"))


(def page (handler/site
            (friend/authenticate
              routes
              {:allow-anon? true
               :default-landing-uri "/"
               :workflows [(openid/workflow
                             :openid-uri "/login"
                             :credential-fn identity)]})))
