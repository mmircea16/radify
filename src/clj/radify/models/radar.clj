(ns radify.models.radar)

(def dummy-radar
  { :id 1
    :name "name of the radar"
    :description "description of the radar"
    :template {
        :id 1
        :segments [{ :id 1
                     :name "techniques"}
                   { :id 2
                     :name "languages"}]
        :tiers [{:id 1
                 :name "hold"
                 :description "something"}
                 {:id 2
                  :name "assess"
                  :description "something"}
                 {:id 3
                  :name "trial"
                  :description "something"}
                 {:id 4
                  :name "adopt"
                  :description "something"}  ]
    }
  :blips [{:id 1
           :name "clojure lang"
           :description "some cool language"
           :segment 1
           :tier 1 }
           {:id 2
            :name "scala"
            :description "some cool language"
            :segment 2
            :tier 1 }
         ]
 })
