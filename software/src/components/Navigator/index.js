import React from "react";
import { connect } from "react-redux";
import { ExpandableListItem, ListItem } from "components";
import { classes } from "common/util";
import { actions } from "reducers";
import styles from "./Navigator.module.scss";

class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesOpened: {},
      scratchPaperOpened: true,
      query: "",
    };
  }

  componentDidMount() {
    const { algorithm } = this.props.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { algorithm } = nextProps.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  toggleCategory(key, categoryOpened = !this.state.categoriesOpened[key]) {
    const categoriesOpened = {
      ...this.state.categoriesOpened,
      [key]: categoryOpened,
    };
    this.setState({ categoriesOpened });
  }

  toggleScratchPaper(scratchPaperOpened = !this.state.scratchPaperOpened) {
    this.setState({ scratchPaperOpened });
  }

  handleChangeQuery(e) {
    const { categories } = this.props.directory;
    const categoriesOpened = {};
    const query = e.target.value;
    categories.forEach((category) => {
      if (
        this.testQuery(category.name) ||
        category.algorithms.find((algorithm) => this.testQuery(algorithm.name))
      ) {
        categoriesOpened[category.key] = true;
      }
    });
    this.setState({ categoriesOpened, query });
  }

  testQuery(value) {
    const { query } = this.state;
    const refine = (string) => string.replace(/-/g, " ").replace(/[^\w ]/g, "");
    const refinedQuery = refine(query);
    const refinedValue = refine(value);

    return (
      new RegExp(`(^| )${refinedQuery}`, "i").test(refinedValue) ||
      new RegExp(refinedQuery, "i").test(
        refinedValue
          .split(" ")
          .map((v) => v && v[0])
          .join("")
      )
    );
  }

  render() {
    const { categoriesOpened } = this.state;
    const { className } = this.props;
    const { categories } = this.props.directory;
    const { algorithm } = this.props.current;

    const categoryKey = algorithm && algorithm.categoryKey;
    const algorithmKey = algorithm && algorithm.algorithmKey;

    return (
      <nav className={classes(styles.navigator, className)}>
        <div className={styles.algorithm_list}>
          {categories.map((category) => {
            if (category === categories[5]) {
              const categoryOpened = categoriesOpened[category.key];
              let algorithms = category.algorithms;
              if (!this.testQuery(category.name)) {
                algorithms = algorithms.filter((algorithm) =>
                  this.testQuery(algorithm.name)
                );
                if (!algorithms.length) return null;
              }
              return (
                <ExpandableListItem
                  key={category.key}
                  onClick={() => this.toggleCategory(category.key)}
                  label={category.name}
                  opened={categoryOpened}
                >
                  {algorithms.map((algorithm) => {
                    if (algorithm.key === "kruskals-minimum-spanning-tree") {
                      return (
                        <ListItem
                          indent
                          key={algorithm.key}
                          selected={
                            category.key === categoryKey &&
                            algorithm.key === algorithmKey
                          }
                          to={`/${category.key}/${algorithm.key}`}
                          label={algorithm.name}
                        />
                      );
                    }
                  })}
                </ExpandableListItem>
              );
            }

            return <></>;
          })}
          <ListItem
            indent
            key="genarategraph"
            to={"/genarategraph"}
            label={"Genarate graph"}
          />
        </div>
        <div className={styles.footer}></div>
      </nav>
    );
  }
}

export default connect(
  ({ current, directory, env }) => ({ current, directory, env }),
  actions
)(Navigator);
