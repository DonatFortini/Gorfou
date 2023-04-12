def random_forest(Notebook,jeu_donnees: tuple, hyper_param: int = 0):
    Notebook.append_cell(1, [
        "from sklearn.ensemble import RandomForestClassifier",
        "from sklearn.model_selection import cross_val_score"
    ])
    Notebook.add_cell([
        f"X,y={jeu_donnees}",
        f"random_forest_classifier=RandomForestClassifier({hyper_param})",
        "random_forest_classifier.fit(X,y)",
        "random_forest_classifier.score(X,y),cross_val_score(random_forest_classifier,X,y)"
    ])

def stochastic_gradient_descent(Notebook,jeu_donnees: tuple, hyper_param: int = 0):
    Notebook.append_cell(2, [
        "from sklearn.linear_model import SGDClassifier",
        "from sklearn.model_selection import cross_val_score"
    ])
    Notebook.add_cell([
        f"X,y={jeu_donnees}",
        f"stochastic_gradient_descent_classifier=SGDClassifier({hyper_param})",
        "stochastic_gradient_descent_classifier.fit(X,y)",
        "stochastic_gradient_descent_classifier.score(X,y),cross_val_score(stochastic_gradient_descent_classifier,X,y)"
    ])

def logistic_regression(Notebook,jeu_donnees: tuple, hyper_param: int = 0):
    Notebook.append_cell(2, [
        "from sklearn.linear_model import LogisticRegression",
        "from sklearn.model_selection import cross_val_score"
    ])
    Notebook.add_cell([
        f"X,y={jeu_donnees}",
        f"logistic_regression_classifier=LogisticRegressionClassifier({hyper_param})",
        "logistic_regression_classifier.fit(X,y)",
        "logistic_regression_classifier.score(X,y),cross_val_score(logistic_regression_classifier,X,y)"
    ])
