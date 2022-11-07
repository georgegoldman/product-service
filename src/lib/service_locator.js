'use strict'

/**
 * A service Locator
 * used to register and resolve dependancy in a recursive manner.
 * @class ServiceLocator
 * @constructor
 */

class ServiceLocator {
    
    constructor () {
        this.dependancyMap = {}
        this.dependancyCache = {}
    }

    /**
     * Adds a dependency to the container.
     * @method register
     * @param {String}   dependencyName The dependency name
     * @param {Function} constructor    The function used for initially instantiating the dependency.
     * @return {void}
     */

    register(dependencyName, constructor) {
        if(typeof constructor !== 'function') {
            throw new Error(dependencyName + ': Dependancy constructor is not function')
        }

        if (!dependencyName) {
            throw new Error('Invalid dependancy name provided');
        }

        this.dependancyMap[dependencyName] = constructor;
    }

    /**
     * Resolves and returns the depdency requested.
     * 
     * @method get
     * @param {string} dependencyName The name of the dependency to resolve.
     * @return {mixed}  The resolved dependency
     */

    get(dependencyName) {
        if(this.dependancyMap[dependencyName] === undefined) {
            throw new Error(dependencyName + ': Attempting to retrieve unknown dependency')
        }

        if(typeof this.dependancyMap[dependencyName] !== 'function') {
            throw new Error(dependencyName + ': Dependency constructor is not a function')
        }

        if (this.dependancyCache[dependencyName] == undefined) {
            var dependencyConstructor = this.dependancyMap[dependencyName];
            var dependency = dependencyConstructor(this);
            if (dependency) {
                this.dependancyCache[dependencyName] = dependency
            }
        }

        return this.dependancyCache[dependencyName]
    }

    /**
     * Retrieves an object containing the dependency name as the key and the resolved dependency
     * as the object. This object contains all dependencies registered in this container.
     * 
     * @method getAll
     * @return {Array} Contain all the dependencies registered in this container after being resolved.
     */
    getAll() {
        var dependencies = Object.keys(this.dependancyMap)
        for (var key in dependencies) {
            this.get(dependencies[key])
        }

        return this.dependancyCache;
    }
    /**
     * Clears all the dependencies from this container and from the cache.
     * @method clear
     * @return {void}
     */
    clear() {
        this.dependancyCache = {}
        this.dependancyMap = {}
    }
}

module.exports = new ServiceLocator()